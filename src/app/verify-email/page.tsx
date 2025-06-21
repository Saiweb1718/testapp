"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await axios.post("/api/auth/verify-email", { token});
        console.log("Verification response:", res);
        setStatus("success");

        toast("Email verified", {
          description: "Your email has been verified successfully.",
        });

        setTimeout(() => {
          router.push("/signin");
        }, 3000);
      } catch (err: any) {
        setStatus("error");
        toast("Verification failed", {
          description: err.response?.data?.message || "Invalid or expired token.",
        });
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="max-w-md mx-auto mt-32 text-center space-y-6 p-6 shadow-md rounded-lg border">
      {status === "verifying" && (
        <>
          <h1 className="text-xl font-semibold">Verifying your email...</h1>
          <p className="text-gray-500">Please wait a moment.</p>
        </>
      )}

      {status === "success" && (
        <>
          <h1 className="text-xl font-bold text-green-600">Email Verified ✅</h1>
          <p className="text-gray-500">Redirecting to login page...</p>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-xl font-bold text-red-600">Verification Failed ❌</h1>
          <p className="text-gray-500">Your verification link may have expired or is invalid.</p>
        </>
      )}
    </div>
  );
}
