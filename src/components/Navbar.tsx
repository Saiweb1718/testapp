// components/Navbar.tsx
"use client";

import { useState,useEffect } from "react";
import { useRouter} from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIN, setIsLoggedIn] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }
  , []);
  if (!mounted) {
    return null; // Prevents hydration error
  }
  const Handleclick =  () =>{
   router.push("/signup")
  }

  return (
    <nav className="bg-white dark:bg-black shadow-lg">
      <div className="max-w-full px-4 sm:px-2 lg:px-8 mr-0">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <img
              src="./logo-removebg-preview.png"
              alt="Logo"
              className="hidden md:flex w-[150px] object-contain"
            />
            <Link
              href="/"
              className="lg:text-2xl sm:text-xl px-8 md:px-0 font-medium text-black dark:text-white font-sans"
            >
              Blogger
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex lg:space-x-16 md:space-x-8 items-center font-sans text-lg font-semibold dark:text-gray-200">
            <Link href="/blog" className="px-4 py-1 rounded-3xl hover:bg-gray-200 dark:hover:bg-gray-700">
              Blog
            </Link>
            <Link href="/about" className="px-4 py-1 rounded-3xl hover:bg-gray-200 dark:hover:bg-gray-700">
              About
            </Link>
            <Link href="/contact" className="px-4 py-1 rounded-3xl hover:bg-gray-200 dark:hover:bg-gray-700">
              Contact
            </Link>
            {!isLoggedIN && <Button
             onClick={Handleclick}>Login / Signup</Button>}

            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-4 font-serif bg-white dark:bg-black shadow-lg rounded-lg mt-2 justify-center items-center text-black dark:text-white">
            <Link href="/blog" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">Blog</Link>
            <Link href="/about" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">About</Link>
            <Link href="/contact" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">Contact</Link>
            {/* Dark mode toggle in mobile menu */}
            <div className="px-2 py-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <div className="items-center flex space-x-4">
                  <span>light</span> <Sun className="h-1 w-1 " />
                </div> : <div className="items-center flex">
                  <span>dark</span> <Moon className="h-1 w-1 " />
                </div> }
                
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
