import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string,username:string, code: string) => {
    const confirmationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${code}&email=${encodeURIComponent(email)}`;
    console.log("Sending verification email to:", email);
    console.log("Verification code:", code);
    try {
        await resend.emails.send({
            from:"onboarding",
            to: email,
            subject: "Verify your email",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {    
        max-width: 600px;
        margin: 0 auto;
        }
        .container h1 {
            color: #333;
        }
        .container p {
            color: #555;
        }
        .button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello ${username},</h1>
        <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
        <a href="${confirmationUrl}" class="button">Verify Email</a>
        <p>If you did not create an account, no further action is required.</p>
        <p>Best regards,<br>Blogger</p>
    </div>
</body>
</html>`
        })
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email");
    }
};