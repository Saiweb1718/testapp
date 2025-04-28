import { NextResponse,NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
    const { username,email,password} = await req.json();
    if(!username || !email || !password){
        return NextResponse.json({message:"Please fill all fields"}, {status:400});
    }
    
    try {
        await dbConnect();
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        })
        if(existingUser){
            return NextResponse.json({message:"User already exists"}, {status:409});
        }
        console.log("Creating user...");
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);
    
        const NewUser = await User.create({
            username,
            email,
            password: hashedPassword,
            verifycode: code,
            codeExpiry: expiry,
            isVerified: false,
            provider: "credentials",
        });
        sendVerificationEmail(email,username,code);
         await NewUser.save();
        console.log("User created successfully:", NewUser);
        return NextResponse.json({message:"User created successfully"}, {status:201});
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({message:"Internal server error"}, {status:500});
        
    }
}