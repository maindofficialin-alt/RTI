import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Search, Menu } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Telangana RTI Online | Official Portal",
  description: "Official RTI portal for the Government of Telangana. File and track RTI applications online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
                  TG
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary leading-none uppercase">RTI Online</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Government of Telangana</span>
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/" className="text-primary hover:text-secondary transition-colors">Home</Link>
              <Link href="/apply" className="hover:text-primary transition-colors">File RTI</Link>
              <Link href="/track" className="hover:text-primary transition-colors">Track Status</Link>
              <Link href="/appeals" className="hover:text-primary transition-colors">Appeals</Link>
              <Link href="/departments" className="hover:text-primary transition-colors">Departments</Link>
            </nav>

            <div className="flex items-center gap-6">
              {/* Language Toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-full p-1 text-xs font-bold">
                <button className="px-3 py-1 bg-white text-primary rounded-full shadow-sm">EN</button>
                <button className="px-3 py-1 text-gray-500 hover:text-primary transition-colors">తెలుగు</button>
              </div>

              <div className="relative hidden lg:block group">
                <input 
                  type="text" 
                  placeholder="Search RTI applications, departments..." 
                  className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:w-80 transition-all focus:ring-2 focus:ring-primary/10 outline-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary" />
              </div>

              <Link href="/login" className="hidden lg:block px-4 py-2 text-sm font-bold text-secondary border border-secondary/30 rounded-full hover:bg-secondary hover:text-white transition-all">
                Demo Login
              </Link>
              <Link href="/login" className="hidden md:block px-4 py-2 text-sm font-bold text-white bg-primary rounded-full hover:bg-primary-dark transition-all shadow-md shadow-primary/20">
                Login / Register
              </Link>
              <button className="md:hidden p-2">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="bg-primary text-white pt-12 pb-6">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-white/10 pb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">Telangana RTI Online</h3>
              <p className="text-sm text-blue-100 max-w-md">
                Empowering citizens through transparency. This portal facilitates the online filing of RTI applications and tracking of their status in various departments of the Government of Telangana.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="text-sm space-y-2 text-blue-100">
                <li><Link href="/" className="hover:text-secondary transition-colors">Home</Link></li>
                <li><Link href="/apply" className="hover:text-secondary transition-colors">File RTI Online</Link></li>
                <li><Link href="/track" className="hover:text-secondary transition-colors">Track Application</Link></li>
                <li><Link href="/guidelines" className="hover:text-secondary transition-colors">RTI Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Help & Support</h4>
              <ul className="text-sm space-y-2 text-blue-100">
                <li><Link href="/faq" className="hover:text-secondary transition-colors">FAQs</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact PIOs</Link></li>
                <li><Link href="/technical-support" className="hover:text-secondary transition-colors">Technical Help</Link></li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-6 text-center text-[10px] text-blue-200 uppercase tracking-widest">
            © 2026 Telangana State Information Commission. All Rights Reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
