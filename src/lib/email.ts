
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_EMAIL,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

export const sendVerificationEmail = async (
  email: string,
  username: string,
  rawtoken: string
) => {
  const verification_Link = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${rawtoken}`;
  console.log(username,email);
  try {
    const response = await transporter.sendMail({
      from: `"Blogger1718" <saideepsriram2005@gmail.com>`,
      to: email,
      subject: "Verify your email",
      html: `
        <h1>Hello ${username},</h1>
        <p>Thank you for signing up! Please verify your email address:</p>
        <a href="${verification_Link}" style="background-color:blue;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;display:inline-block;">
          Verify Email
        </a>
        <p>If you did not create an account, no action is needed.</p>
      `,
    });

    // console.log("Verification email sent:", response.messageId);
  } catch (error) {
    console.log("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};
