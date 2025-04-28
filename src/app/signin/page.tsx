"use client";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import  Link  from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn  = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleCrediantialSignIn = async () => {
    try {
     await signIn("credentials", {
        identifier: username,
        password: password,
        redirect: false,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Error signing in with credentials:", error);
      setError("Invalid credentials. Please try again.");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6 p-8">
      <h1 className="text-2xl font-bold">Create an Account</h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username or Email</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="IronMan"
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

        <Button className="w-full"
        onClick={handleCrediantialSignIn}>Login</Button>

        <div>
          <Button onClick={handleGoogleSignIn } className="w-full">
            <div className="flex items-center justify-center space-x-4">
              <img src="./google.png" alt="Image incorrect"  className=" w-4 "/>
              <p>Continue with Google</p>
            </div></Button>
        </div>
      </div>
      <p>{error}</p>
    </div>
  );
}
