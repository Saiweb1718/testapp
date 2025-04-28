
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";

export const metadata = {
  title: "My App",
  description: "Dark mode enabled!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
         {children}
         <Toaster/>
          {/* <SessionProvider session={session}>
            <Navbar />
            {children}
          </SessionProvider> */}

        </ThemeProvider>
      </body>
    </html>
  );
}


