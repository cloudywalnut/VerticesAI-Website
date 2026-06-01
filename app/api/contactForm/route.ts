import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    await transporter.sendMail({
      from: `"Vertices Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: "New Contact Form Submission",
      replyTo: email,
      html: `
        <h2>New Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company || "N/A"}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, error: "Email failed" },
      { status: 500 }
    );
  }
}