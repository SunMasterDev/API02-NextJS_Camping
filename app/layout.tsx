import type { Metadata } from "next";
import { Geist_Mono , Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";

const prompt=Prompt({
  weight:'400',
  subsets:['latin','thai']
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "โปรเจคสร้างNext JS",
  description: "ทำระบบล๊อคอิน สร้างแผนที่ สร้างโพสกดไลค์และแชร์ได้",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <body
        className={`${prompt.className} ${geistMono.variable} antialiased`} 
      >
        <Suspense>
          <Providers>
            <Navbar/>
              <main className="container">{children}</main>
          </Providers>
        </Suspense>
      </body>
    </html>
    </ClerkProvider>
  );
}
