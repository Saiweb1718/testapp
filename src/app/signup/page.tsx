"use client";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import  Link  from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn  = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6 p-8">
      <h1 className="text-2xl font-bold">Create an Account</h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="IronMan"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <Button className="w-full">Register</Button>
        <div>
          <Button onClick={handleGoogleSignIn } className="w-full">
            <div className="flex items-center justify-center space-x-4">
              <img src="./google.png" alt="Image incorrect"  className=" w-4 "/>
              <p>Continue with Google</p>
            </div></Button>
           <div className="flex items-center justify-center space-x-4 mt-4">
           <p>Already have an account?</p><Button><Link href="/signin">Login</Link></Button>
           </div>
        </div>
      </div>
    </div>
  );
}
