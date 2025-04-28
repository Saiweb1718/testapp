// import Image from "next/image";
"use client";
import Registration from "@/app/signup/page";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { useEffect,useState } from "react";
import SignInPage from "./signin/page";
import RegisterPage from "./signup/page";


export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null; // Prevents hydration error
  }
  return (
   <>
   <Navbar/>
   <RegisterPage/>
   </>
  );
}
