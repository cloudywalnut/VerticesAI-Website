import { EC2Client, RunInstancesCommand } from "@aws-sdk/client-ec2";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const ec2 = new EC2Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.VERTICES_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.VERTICES_AWS_SECRET_ACCESS_KEY!,
  },
});

const repoUrl = "https://github.com/cloudywalnut/VerticesBot.git";

function makeSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
}

async function addNginxConfig(clientName: string, privateIp: string) {
  const res = await fetch(`${process.env.NGINX_MANAGER_URL}/add-client`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NGINX_MANAGER_API_KEY!,
    },
    body: JSON.stringify({ clientName, privateIp }),
  });

  if (!res.ok) throw new Error(`Nginx manager failed: ${res.statusText}`);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { botName } = body;

  if (!botName?.trim()) {
    return NextResponse.json({ error: "Bot name is required" }, { status: 400 });
  }

  const slug = makeSlug(botName);
  const botUrl = `https://${slug}.verticesai.tech`;

  // Check uniqueness before touching EC2
  const { data: existing } = await supabase
    .from("bots")
    .select("id")
    .eq("url", botUrl)
    .maybeSingle();

  // Bot naming check  
  if (existing) {
    return NextResponse.json(
      { error: "A bot with this name already exists. Please choose a different name." },
      { status: 409 }
    );
  }

  // Free Bots Availability check
  const { count } = await supabase.from("bots").select("*", { count: "exact", head: true });
  if ((count ?? 0) >= 10) {
    return NextResponse.json(
      { error: "No more free bots available. Please contact us to Get Yours." },
      { status: 403 }
    );
  }

  const userData = `#!/bin/bash
    set -e
    apt update -y
    apt install -y curl git

    curl -fsSL https://get.docker.com | sh
    usermod -aG docker ubuntu || true

    git clone ${repoUrl} app
    cd app

    docker build -t verticesbot .

    docker run -d \\
    --name verticesbot \\
    --restart unless-stopped \\
    -p 80:3000 \\
    -v $(pwd)/userdata:/app/userdata \\
    verticesbot
  `;

  // Create DB record first — if this fails there's no point spinning up EC2
  const { data: botRecord, error: dbError } = await supabase
    .from("bots")
    .insert({
      user_id: user.id,
      bot_name: botName.trim(),
      url: botUrl,
    })
    .select("id")
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  try {
    const runResult = await ec2.send(new RunInstancesCommand({
      MaxCount: 1,
      MinCount: 1,
      ImageId: "ami-02dd44faa40720bb8",
      InstanceType: "t2.micro",
      KeyName: "verticesbot",
      EbsOptimized: false,

      BlockDeviceMappings: [{
        DeviceName: "/dev/sda1",
        Ebs: {
          Encrypted: false,
          DeleteOnTermination: true,
          Iops: 3000,
          SnapshotId: "snap-0b5612ddb80e8a229",
          VolumeSize: 12,
          VolumeType: "gp3",
          Throughput: 125,
        },
      }],

      NetworkInterfaces: [{
        AssociatePublicIpAddress: true,
        DeviceIndex: 0,
        Groups: ["sg-0f87f9821e17d5031"],
      }],

      CreditSpecification: { CpuCredits: "standard" },

      TagSpecifications: [{
        ResourceType: "instance",
        Tags: [
          { Key: "Name", Value: `VerticesBot-${slug}` },
          { Key: "Client", Value: slug },
        ],
      }],

      MetadataOptions: {
        HttpEndpoint: "enabled",
        HttpPutResponseHopLimit: 2,
        HttpTokens: "required",
      },

      PrivateDnsNameOptions: {
        HostnameType: "ip-name",
        EnableResourceNameDnsARecord: true,
        EnableResourceNameDnsAAAARecord: false,
      },

      UserData: Buffer.from(userData).toString("base64"),
    }));

    const instance = runResult.Instances![0];
    const instanceId = instance.InstanceId!;
    const privateIp = instance.PrivateIpAddress!;

    await addNginxConfig(slug, privateIp);

    // Update the record with the instance ID now that EC2 succeeded
    await supabase
      .from("bots")
      .update({ instance_id: instanceId })
      .eq("id", botRecord.id);

    return NextResponse.json({ success: true, url: botUrl, instanceId });

  } catch (err) {
    // EC2 or nginx failed — delete the DB record so there's no orphan
    await supabase.from("bots").delete().eq("id", botRecord.id);

    const message = err instanceof Error ? err.message : "Deployment failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
