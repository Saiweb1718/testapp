import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredintialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import {User} from "@/models/user.model"
import bcrypt from "bcryptjs";


export const authOptions : NextAuthOptions = {
    secret:process.env.NEXTAUTH_SECRET,
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!, // ! is used to assert that the value is not null or undefined
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredintialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                identifier: { label: "Email or Username", type: "text",  },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req):Promise<any> {
                await dbConnect();

               try {
                 const { identifier, password } = credentials as { identifier: string; password: string };
                 const user = await User.findOne({
                     $or:[
                       {email:identifier},
                       {username:identifier}
                     ]
                 })
                 if (!user) {
                    console.log("enter correct details");
                    return null;
                     throw new Error("No user foUnd with the given credentials");
                 }
                 const isPasswordCorrect = await bcrypt.compare(password, user.password);
                 if(!isPasswordCorrect) {
                     throw new Error("Incorrect password");
                 }
                 if (!user.isVerified) {
                     throw new Error("Please verify your email before logging in.");
                 }
                 return user;
               } catch (error) {
                 console.error("Error during authorization:", error);
                 throw new Error("Authorization failed. Please try again.");
                
               }
            }
        })
    ],

    // pages:{
    //     signIn:"/signin",
    // },
    session:{
        strategy:"jwt",
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user._id.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
            }
            return token;
        },
        async session({session,token}){
            if(token){
                session.user._id = token.id;
               session.user.isVerified = token.isVerified;
                session.user.username = token.username;
            }
            return session; 
        }    
    }
}