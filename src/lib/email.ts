import { log } from "console";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.BREVO_EMAIL,   // your Brevo login email
    pass: process.env.BREVO_SMTP_PASS,  // your SMTP password
  },
});

export const sendVerificationEmail = async (email: string, username: string, code: string) => {
  const confirmationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${code}&email=${encodeURIComponent(email)}`;
  
  try {
   const response =  await transporter.sendMail({
      from: `"Blogger1718" <saideepsriram2005@gmail.com>`,
      to: email,
      subject: "Verify your email",
      html: `
        <h1>Hello ${username},</h1>
        <p>Thank you for signing up! Please verify your email address:</p>
        <a href="${confirmationUrl}" style="background-color:blue;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">Verify Email</a>
        <p>If you did not create an account, no action is needed.</p>
      `,
    });
    console.log("Verification email sent!",response);
    
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};
