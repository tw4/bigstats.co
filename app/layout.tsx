import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BigStats.co | Oyunun İstatistiği, Senin Gücün!",
  description:
    "BigStats.co ile oyun performansını analiz et, rakiplerinin önüne geç. Tüm istatistikler, tek platformda.",
  openGraph: {
    title: "BigStats.co | Oyunun İstatistiği, Senin Gücün!",
    description:
      "BigStats.co ile oyun performansını analiz et, rakiplerinin önüne geç. Tüm istatistikler, tek platformda.",
    url: "https://bigstats.co/",
    siteName: "BigStats.co",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "BigStats.co Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BigStats.co | Oyunun İstatistiği, Senin Gücün!",
    description:
      "BigStats.co ile oyun performansını analiz et, rakiplerinin önüne geç. Tüm istatistikler, tek platformda.",
    site: "@bigstatsco",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`m-5 ${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Basit Navbar */}
        <nav
          className='w-full h-14 flex items-center px-8 bg-background/60 shadow-lg backdrop-blur-xl sticky top-0 z-50'
          style={{ WebkitBackdropFilter: "blur(16px)" }}>
          <span
            className='text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-gradient-x'
            style={{
              backgroundImage:
                "linear-gradient(90deg, #53fc18 0%, #53fc18 35%, #fff 50%, #53fc18 65%, #53fc18 100%)",
            }}>
            BigStats.co
          </span>
        </nav>
        {children}
        {/* Footer - profesyonel, navbar ile uyumlu */}
        <footer
          className='w-full h-14 flex items-center px-8 bg-background/60 shadow-lg backdrop-blur-xl z-50 border-t border-border/20'
          style={{ WebkitBackdropFilter: "blur(16px)" }}>
          <div className='flex w-full items-center justify-between'>
            <span
              className='text-base font-bold tracking-tight bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-gradient-x'
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #53fc18 0%, #53fc18 35%, #fff 50%, #53fc18 65%, #53fc18 100%)",
              }}>
              BigStats.co
            </span>
            <span className='text-xs text-muted-foreground text-right'>
              © {new Date().getFullYear()} BigStats.co — Tüm hakları saklıdır.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
