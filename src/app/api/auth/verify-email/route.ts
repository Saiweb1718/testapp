import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";

export async function POST(req: Request) {
    const { code, email } = await req.json();
    if (!code || !email) {
        return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
    }

    try {
        await dbConnect();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (user.isVerified) {
            return NextResponse.json({ message: "User already verified" }, { status: 409 });
        }

        if (user.verifycode !== code) {
            return NextResponse.json({ message: "Invalid verification code" }, { status: 401 });
        }

        if ( user.codeExpiry && user.codeExpiry < new Date()) {
            return NextResponse.json({ message: "Verification code expired" }, { status: 410 });
        }

        user.isVerified = true;
        user.verifycode = undefined;
        user.codeExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error verifying email:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }

}