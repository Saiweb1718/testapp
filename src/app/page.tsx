// import Image from "next/image";
"use client";
import Registration from "@/app/signup/page";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { useEffect,useState } from "react";

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
   </>
  );
}
