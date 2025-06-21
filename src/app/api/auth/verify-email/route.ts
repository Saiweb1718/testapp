
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import crypto from "crypto"


export async function POST(req: Request) {
    const { token } = await req.json();
    if(!token){
        return NextResponse.json(
            {message:"code is undefined"},{status:400}
        );
    }
    const hashed_token = crypto.createHash('sha256').update(token).digest("hex")
    

    try {
        await dbConnect();
        console.log("hashed token",hashed_token);
        
        const user = await User.findOne({ verifycode:hashed_token });
        console.log("user Object1",user);
        if (!user ||(user && (!user.codeExpiry || user.codeExpiry < new Date()))) {
            return NextResponse.json({ message: "Invalid or expired the verification link" }, { status: 404 });
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