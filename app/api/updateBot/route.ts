import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import { NodeSSH } from "node-ssh";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const ec2 = new EC2Client({ region: "ap-southeast-1" });

const UPDATE_COMMANDS = [
  "git -C /app pull",
  "docker build -t verticesbot /app",
  "docker stop verticesbot || true",
  "docker rm verticesbot || true",
  `docker run -d \
    --name verticesbot \
    --restart unless-stopped \
    -p 80:3000 \
    -v /app/userdata:/app/userdata \
    verticesbot`,
];

async function getInstances() {
  const result = await ec2.send(
    new DescribeInstancesCommand({
      Filters: [
        { Name: "tag:Name", Values: ["VerticesBot-*"] },
        { Name: "instance-state-name", Values: ["running"] },
      ],
    })
  );

  return (result.Reservations ?? [])
    .flatMap((r) => r.Instances ?? [])
    .map((i) => ({
      instanceId: i.InstanceId!,
      publicIp: i.PublicIpAddress!,
      clientName: i.Tags?.find((t) => t.Key === "Client")?.Value ?? "unknown",
    }));
}

async function updateInstance(instance: { instanceId: string; publicIp: string; clientName: string }) {
  const { instanceId, publicIp, clientName } = instance;
  const ssh = new NodeSSH();

  try {
    await ssh.connect({
      host: publicIp,
      username: "ubuntu",
      // SSH key read directly from env var — no file needed
      privateKey: process.env.SSH_PRIVATE_KEY,
      readyTimeout: 30_000,
    });

    for (const cmd of UPDATE_COMMANDS) {
      const { code } = await ssh.execCommand(`sudo ${cmd}`, { cwd: "/app" });
      if (code !== 0 && code !== null) throw new Error(`Command failed: ${cmd}`);
    }

    return { clientName, instanceId, status: "ok" };

  } catch (err) {
    return {
      clientName,
      instanceId,
      status: "failed",
      error: err instanceof Error ? err.message : "Unknown error",
    };
  } finally {
    ssh.dispose();
  }
}

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const instances = await getInstances();

    if (instances.length === 0) {
      return NextResponse.json({ success: true, results: [], message: "No running instances found" });
    }

    const results = await Promise.all(instances.map(updateInstance));
    const failed = results.filter((r) => r.status === "failed");

    return NextResponse.json({
      success: failed.length === 0,
      results,
      ...(failed.length > 0 && { error: `${failed.length} bot(s) failed to update` }),
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
