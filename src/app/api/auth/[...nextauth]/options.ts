import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { Profile } from "next-auth";




export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile: Profile): Promise<any> {
        await dbConnect();
        try {
          const existingUser = await User.findOne({
            $or: [
              { email: profile.email },
              { username: profile.name?.replace(" ", "_")},
            ],
          });
          
          if (existingUser) {
            if (existingUser.provider !== "google") {
              throw new Error("Email already registered with password");
            }
            return {
              id: existingUser._id.toString(),
              email: existingUser.email,
              name: existingUser.username,
            };
          }

          const newUser = await User.create({
            email: profile.email,
            username: 
              profile.name?.replace(" ", "_") , 
            isVerified: true,
            provider: "google",
          });

          return {
            id: newUser._id.toString(),
            email: newUser.email,
            name: newUser.username,
          };
        } catch (error) {
          console.error("Google auth error:", error);
          throw error;
        }
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        await dbConnect();

        try {
          const { identifier, password } = credentials as {
            identifier: string;
            password: string;
          };

          const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          if (user.provider === "google") {
            throw new Error("Please use Google login for this account");
          }

          if (!user.password) {
            throw new Error("Password not set for this account");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          
          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your email before logging in");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
            provider: user.provider,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin?error=",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.provider = user.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token.id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
};