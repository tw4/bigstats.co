import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BigStats.co - Oyun İstatistikleri ve Performans Analizi Platformu",
  description:
    "CS2, Faceit, Valorant ve Apex Legends için detaylı oyun istatistikleri, performans analizi ve rakip takibi. Oyun becerilerini geliştir, ELO puanını artır.",
  keywords:
    "oyun istatistikleri, CS2 stats, Faceit analizi, Valorant istatistik, oyun performansı, ELO takibi, esports analiz, oyuncu profili",
  authors: [{ name: "BigStats.co" }],
  creator: "BigStats.co",
  publisher: "BigStats.co",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://bigstats.co",
    siteName: "BigStats.co",
    title: "BigStats.co - Oyun İstatistikleri ve Performans Analizi",
    description:
      "En kapsamlı oyun istatistik platformu. CS2, Faceit, Valorant için detaylı analizler.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BigStats.co - Oyun İstatistikleri Platformu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BigStats.co - Oyun İstatistikleri Platformu",
    description:
      "Oyun performansını analiz et, rakiplerinin önüne geç. Detaylı istatistikler ve analizler.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://bigstats.co",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
        <div className='m-5'>{children}</div>
        {/* Footer - profesyonel, navbar ile uyumlu */}
        {/* Footer */}
        <footer className='relative bg-background border-t py-12 px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid md:grid-cols-4 gap-8'>
              <div className='md:col-span-2'>
                <h3 className='text-2xl font-bold mb-4'>
                  <span
                    className='text-base font-bold tracking-tight bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-gradient-x'
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #53fc18 0%, #53fc18 35%, #fff 50%, #53fc18 65%, #53fc18 100%)",
                    }}>
                    BigStats.co
                  </span>
                </h3>
                <p className='text-muted-foreground mb-4 max-w-md'>
                  Türkiye'nin en kapsamlı oyun istatistik platformu. CS2,
                  Faceit, Valorant ve Apex Legends için detaylı performans
                  analizi, ELO takibi ve oyuncu profili inceleme hizmetleri.
                </p>
                <div className='flex space-x-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    aria-label='Discord sunucumuza katıl'>
                    Discord
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    aria-label="Twitter'da takip et">
                    Twitter
                  </Button>
                </div>
              </div>

              <nav aria-labelledby='platform-nav'>
                <h4 id='platform-nav' className='font-semibold mb-4'>
                  Platform
                </h4>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  <li>
                    <a
                      href='#platform-features'
                      className='hover:text-primary transition-colors'>
                      Özellikler
                    </a>
                  </li>
                  <li>
                    <a
                      href='#supported-games'
                      className='hover:text-primary transition-colors'>
                      Desteklenen Oyunlar
                    </a>
                  </li>
                  <li>
                    <a
                      href='/api'
                      className='hover:text-primary transition-colors'>
                      API Dokümantasyonu
                    </a>
                  </li>
                  <li>
                    <a
                      href='/pricing'
                      className='hover:text-primary transition-colors'>
                      Fiyatlandırma
                    </a>
                  </li>
                </ul>
              </nav>

              <nav aria-labelledby='support-nav'>
                <h4 id='support-nav' className='font-semibold mb-4'>
                  Destek
                </h4>
                <ul className='space-y-2 text-sm text-muted-foreground'>
                  <li>
                    <a
                      href='/help'
                      className='hover:text-primary transition-colors'>
                      Yardım Merkezi
                    </a>
                  </li>
                  <li>
                    <a
                      href='/contact'
                      className='hover:text-primary transition-colors'>
                      İletişim
                    </a>
                  </li>
                  <li>
                    <a
                      href='/privacy'
                      className='hover:text-primary transition-colors'>
                      Gizlilik Politikası
                    </a>
                  </li>
                  <li>
                    <a
                      href='/terms'
                      className='hover:text-primary transition-colors'>
                      Kullanım Şartları
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className='border-t mt-8 pt-8 text-center text-sm text-muted-foreground'>
              <p>
                &copy; 2024 BigStats.co. Tüm hakları saklıdır. CS2
                İstatistikleri, Faceit ELO Takibi, Valorant Rank Analizi.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
