import React from 'react'
import { useState,useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const emailverification =  async () => {

    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const email = searchParams.get('email');
    const [status, setStatus] = useState("Verifying...")

  useEffect(()=>{
    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, email }),
        });
        const result = await res.json();
        if (res.ok) {
          setStatus("Email verified successfully!");
          toast("Email Verified", { description: "You may now log in." });
        } else {
          setStatus(result.message || "Verification failed.");
        }
      } catch (error) {
        setStatus("An error occurred during verification.");
      }
    };
    verifyEmail();
  }, [code, email]);

  return (
    <div className="container mx-auto" >
        <h1 className='mx-auto font-bold'>Email Vefrification</h1>
        <p>{status}</p>
        <p>Redirecting to login page...</p>
        <p>If you are not redirected, click <a href="/signin">here</a>.</p>
    </div>

  )
}

