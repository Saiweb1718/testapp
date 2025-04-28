"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/schemas/signUpschema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type SignupData = z.infer<typeof signUpSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signUpSchema),
  });

  const handleRegister = async (data: SignupData) => {
    const { username, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast("Password mismatch", {
        description: "Passwords do not match.",
      });
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      toast("Weak password", {
        className: "bg-red-500 text-white",
        description:
          "Password must be at least 8 characters, include an uppercase letter and a number.",
        duration: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      toast("Success", {
        description: "Registration successful. Check your email to verify.",
      });

      setTimeout(() => {
        // window.location.href = "/verify";
      }, 1500);
    } catch (err: any) {
      toast("Registration failed", {
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      toast("Google sign-in error", {
        description: "Something went wrong while signing in with Google.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6 p-8">
      <h1 className="text-2xl font-bold">Create an Account</h1>

      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="IronMan"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full"
          variant="outline"
        >
          <div className="flex items-center justify-center space-x-4">
            <img src="/google.png" alt="Google" className="w-4 h-4" />
            <p>Continue with Google</p>
          </div>
        </Button>

        <div className="flex items-center justify-center space-x-4 mt-4">
          <p>Already have an account?</p>
          <Link href="/signin">
            <Button type="button" variant="link">
              Login
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
