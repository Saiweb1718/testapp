import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "My App",
  description: "Dark mode enabled!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

