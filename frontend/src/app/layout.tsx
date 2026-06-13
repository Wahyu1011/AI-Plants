import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Leaf } from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AI Plants - Plant Disease Detector",
  description: "Deteksi penyakit tanaman secara real-time menggunakan AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-slate-900`}>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center px-4 justify-between">
              <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
                <Leaf className="w-6 h-6" />
                AI Plants
              </Link>
              <nav className="flex gap-4">
                <Link href="/scan" className="text-sm font-medium hover:text-primary transition-colors">
                  Scan Daun
                </Link>
                <Link href="/history" className="text-sm font-medium hover:text-primary transition-colors">
                  Riwayat
                </Link>
                <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                  Admin
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1 container mx-auto p-4 flex flex-col">
            {children}
          </main>
          <footer className="border-t bg-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AI Plants - Smart Farming Platform
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
