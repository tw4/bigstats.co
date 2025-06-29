/* eslint-disable @next/next/no-img-element */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FaceitPlayerResponse } from "@/types/faceit.types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Trophy,
  Target,
  TrendingUp,
  Users,
  Gamepad2,
  BarChart3,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const backgroundImages = [
    "https://images8.alphacoders.com/132/1329760.jpeg",
    "https://cdn.wallpapersafari.com/77/28/c4DmOo.jpg",
  ];

  const [bgIndex, setBgIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedGame, setSelectedGame] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    function startTransition() {
      setFade(false);
      timeoutRef.current = setTimeout(() => {
        setPrevIndex(() => {
          const next = (bgIndex + 1) % backgroundImages.length;
          setBgIndex(next);
          setFade(true);
          return bgIndex;
        });
      }, 2000);
    }

    intervalRef.current = setInterval(startTransition, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSearchButton = async () => {
    switch (selectedGame) {
      case "Faceit":
        const res = await fetch(`/api/faceit/${user}/id`, {
          method: "GET",
        });
        const data = (await res.json()) as FaceitPlayerResponse;
        const playerId = data.items[0].player_id;
        if (playerId !== "") {
          router.push(`/faceit/${playerId}`);
        }
        break;
      default:
        break;
    }
  };

  const features = [
    {
      icon: <BarChart3 className='h-8 w-8' />,
      title: "Detaylı Oyun İstatistikleri",
      description:
        "CS2, Faceit ve diğer oyunlar için kapsamlı performans metrikleri. K/D oranı, headshot yüzdesi, harita performansı ve daha fazlası.",
      keywords: "oyun istatistikleri, CS2 stats, performans metrikleri",
    },
    {
      icon: <TrendingUp className='h-8 w-8' />,
      title: "ELO ve Rank Takibi",
      description:
        "Faceit ELO, CS2 rank ve diğer oyunlarda seviye takibi. Zaman içindeki gelişimini görselleştir ve hedeflerine ulaş.",
      keywords: "ELO takibi, rank analizi, seviye gelişimi",
    },
    {
      icon: <Users className='h-8 w-8' />,
      title: "Rakip ve Takım Analizi",
      description:
        "Rakiplerinin güçlü-zayıf yönlerini keşfet. Takım arkadaşlarınla uyumunu analiz et ve stratejik avantaj elde et.",
      keywords: "rakip analizi, takım istatistikleri, oyuncu karşılaştırması",
    },
    {
      icon: <Trophy className='h-8 w-8' />,
      title: "Başarı ve Hedef Sistemi",
      description:
        "Kişisel hedefler belirle, başarılarını takip et. Motivasyonunu yüksek tut ve sürekli gelişim sağla.",
      keywords: "oyun hedefleri, başarı takibi, motivasyon",
    },
  ];

  const supportedGames = [
    {
      name: "Counter-Strike 2",
      slug: "counter-strike-2",
      logo: "data:image/png;base64,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",
      status: "Yakında",
      players: "1.2M+",
      description: "CS2 maç istatistikleri, rank takibi ve performans analizi",
    },
    {
      name: "FACEIT",
      slug: "faceit",
      logo: "https://play-lh.googleusercontent.com/4iFS-rI0ImIFZyTwjidPChDOTUGxZqX2sCBLRsf9g_noMIUnH9ywsCmCzSu9vSM9Jg",
      status: "Aktif",
      players: "850K+",
      description:
        "Faceit ELO takibi, maç geçmişi ve detaylı performans metrikleri",
    },
    {
      name: "Valorant",
      slug: "valorant",
      logo: "https://i.pinimg.com/736x/b7/cf/62/b7cf62846ae6ae5e96b35cf9d5e05a7c.jpg",
      status: "Yakında",
      players: "2.1M+",
      description:
        "Valorant rank sistemi, agent istatistikleri ve takım performansı",
    },
    {
      name: "Apex Legends",
      slug: "apex-legends",
      logo: "https://logos-world.net/wp-content/uploads/2020/11/Apex-Legends-Emblem.png",
      status: "Yakında",
      players: "900K+",
      description:
        "Apex Legends karakter istatistikleri ve battle royale performansı",
    },
  ];

  const stats = [
    {
      label: "Aktif Oyuncu",
      value: "50K+",
      icon: <Users className='h-5 w-5' />,
      description: "Platformumuzu kullanan aktif oyuncu sayısı",
    },
    {
      label: "Analiz Edilen Maç",
      value: "2.5M+",
      icon: <Gamepad2 className='h-5 w-5' />,
      description: "Bugüne kadar analiz edilen toplam maç sayısı",
    },
    {
      label: "Desteklenen Oyun",
      value: "4+",
      icon: <Target className='h-5 w-5' />,
      description: "Platform tarafından desteklenen oyun sayısı",
    },
    {
      label: "Günlük API Sorgusu",
      value: "100K+",
      icon: <Zap className='h-5 w-5' />,
      description: "Günlük olarak işlenen veri sorgusu sayısı",
    },
  ];

  return (
    <>
      {/* Background Image Carousel */}
      <div className='fixed inset-0 z-[-1] select-none'>
        {prevIndex !== bgIndex && (
          <div className='absolute inset-0 w-full h-full'>
            <img
              src={backgroundImages[prevIndex] || "/placeholder.svg"}
              alt='CS2 ve esports oyun arkaplanı - BigStats.co'
              className={`blur-sm object-cover w-full h-full absolute inset-0 transition-opacity duration-2000 ease-in-out ${
                fade ? "opacity-0" : "opacity-100"
              }`}
              style={{ zIndex: 1 }}
            />
            <div
              className={`absolute inset-0 transition-opacity duration-2000 ease-in-out pointer-events-none ${
                fade ? "opacity-0" : "opacity-100"
              }`}
              style={{ background: "rgba(0,0,0,0.7)", zIndex: 2 }}></div>
          </div>
        )}

        <div className='absolute inset-0 w-full h-full'>
          <img
            src={backgroundImages[bgIndex] || "/placeholder.svg"}
            alt='Oyun istatistikleri ve esports analizi arkaplanı'
            className={`blur-sm object-cover w-full h-full absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: 3 }}
          />
          <div
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out pointer-events-none ${
              fade ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: "rgba(0,0,0,0.7)", zIndex: 4 }}></div>
        </div>
      </div>

      <main className='relative flex flex-col min-h-screen'>
        {/* Hero Section */}
        <header className='relative flex flex-col justify-center items-center min-h-screen px-4'>
          <section className='w-full max-w-4xl flex flex-col items-center justify-center mt-8 sm:mt-14 mb-6 sm:mb-12 gap-3 sm:gap-6'>
            <span className='mb-2 px-4 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold tracking-widest uppercase shadow-sm z-10'>
              Türkiye'nin En Kapsamlı Oyun İstatistik Platformu
            </span>

            <h1
              className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-gradient-x drop-shadow-xl z-10 leading-tight'
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #53fc18 0%, #53fc18 40%, #fff 50%, #53fc18 60%, #53fc18 100%)",
              }}>
              CS2, Faceit ve Valorant İstatistikleri Oyun Performansını Artır
            </h1>

            <p className='mt-2 text-base xs:text-lg sm:text-xl text-muted-foreground text-center max-w-3xl z-10'>
              <strong className='text-primary'>BigStats.co</strong> ile
              Counter-Strike 2, Faceit, Valorant ve Apex Legends oyun
              istatistiklerini analiz et. ELO takibi, rank analizi, maç geçmişi
              ve detaylı performans metrikleri ile rakiplerinin önüne geç.
              Ücretsiz oyuncu profili analizi ve kapsamlı istatistikler.
            </p>

            <div className='flex flex-wrap justify-center gap-2 mt-4 z-10'>
              <Badge variant='secondary' className='text-xs'>
                CS2 İstatistikleri
              </Badge>
              <Badge variant='secondary' className='text-xs'>
                Faceit ELO Takibi
              </Badge>
              <Badge variant='secondary' className='text-xs'>
                Valorant Rank Analizi
              </Badge>
              <Badge variant='secondary' className='text-xs'>
                Ücretsiz Analiz
              </Badge>
            </div>
          </section>

          {/* Search Bar */}
          <section className='bg-background rounded-2xl flex flex-col sm:flex-row justify-center items-center w-full max-w-lg border border-gray-40 hover:border-primary sm:border-2 mx-auto px-2 py-2 gap-2 sm:gap-0 shadow-lg sm:shadow-xl transition-all duration-300 z-10'>
            <Select onValueChange={(value) => setSelectedGame(value)}>
              <SelectTrigger
                className='w-full sm:w-[120px] md:w-[140px] text-sm sm:text-base'
                aria-label='Oyun seçimi'>
                <SelectValue placeholder='Oyun seç' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem disabled value='CS2'>
                  CS2 (Yakında)
                </SelectItem>
                <SelectItem value='Faceit'>Faceit</SelectItem>
              </SelectContent>
            </Select>

            <Input
              onChange={(e) => setUser(e.target.value)}
              placeholder='Kullanıcı adını gir (örn: s1mple)'
              className='w-full border-none sm:rounded-none sm:rounded-l-2xl text-sm sm:text-base focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-200'
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchButton();
              }}
              aria-label='Oyuncu kullanıcı adı'
            />

            <Button
              onClick={handleSearchButton}
              className='w-full sm:w-auto mt-1 sm:mt-0 rounded-2xl sm:rounded-none sm:rounded-br-2xl sm:rounded-tr-2xl hover:cursor-pointer text-sm sm:text-base px-6 py-2 sm:px-4 sm:py-2 transition-all duration-200'
              aria-label='Oyuncu istatistiklerini ara'>
              İstatistikleri Getir
            </Button>
          </section>
        </header>

        {/* Stats Section */}
        <section
          className='relative bg-background/95 backdrop-blur-sm py-16 px-4'
          aria-labelledby='platform-stats'>
          <div className='max-w-6xl mx-auto'>
            <h2 id='platform-stats' className='sr-only'>
              Platform İstatistikleri
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {stats.map((stat, index) => (
                <article key={index} className='text-center'>
                  <div
                    className='flex justify-center mb-2 text-primary'
                    aria-hidden='true'>
                    {stat.icon}
                  </div>
                  <div className='text-2xl md:text-3xl font-bold text-foreground mb-1'>
                    {stat.value}
                  </div>
                  <div className='text-sm text-muted-foreground'>
                    {stat.label}
                  </div>
                  <p className='sr-only'>{stat.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className='relative bg-background py-20 px-4'
          aria-labelledby='platform-features'>
          <div className='max-w-6xl mx-auto'>
            <header className='text-center mb-16'>
              <h2
                id='platform-features'
                className='text-3xl md:text-4xl font-bold mb-4'>
                Neden <span className='text-primary'>BigStats.co</span> Tercih
                Edilmeli?
              </h2>
              <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
                CS2, Faceit, Valorant ve Apex Legends için en detaylı oyun
                istatistikleri ve performans analizi araçları. Oyun becerilerini
                geliştirmek için ihtiyacın olan tüm veriler tek platformda.
              </p>
            </header>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {features.map((feature, index) => (
                <article
                  key={index}
                  className='border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg rounded-lg'>
                  <Card className='h-full border-0'>
                    <CardHeader className='text-center'>
                      <div
                        className='mx-auto mb-4 p-3 bg-primary/10 rounded-full text-primary w-fit'
                        aria-hidden='true'>
                        {feature.icon}
                      </div>
                      <CardTitle className='text-xl'>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className='text-center'>
                        {feature.description}
                      </CardDescription>
                      <div className='sr-only'>
                        Anahtar kelimeler: {feature.keywords}
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Games Section */}
        <section
          className='relative bg-muted/30 py-20 px-4'
          aria-labelledby='supported-games'>
          <div className='max-w-6xl mx-auto'>
            <header className='text-center mb-16'>
              <h2
                id='supported-games'
                className='text-3xl md:text-4xl font-bold mb-4'>
                Desteklenen Oyunlar ve İstatistikler
              </h2>
              <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
                En popüler FPS ve battle royale oyunları için detaylı
                istatistikler, ELO takibi ve performans analizleri. Her oyun
                için özelleştirilmiş metrikler ve kapsamlı raporlar.
              </p>
            </header>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {supportedGames.map((game, index) => (
                <article
                  key={index}
                  className='hover:shadow-lg transition-all duration-300 hover:scale-105'>
                  <Card className='text-center h-full'>
                    <CardHeader>
                      <div className='mx-auto mb-4'>
                        <img
                          src={game.logo || "/placeholder.svg"}
                          alt={`${game.name} oyun logosu ve istatistikleri`}
                          className='w-16 h-16 rounded-lg'
                          width={64}
                          height={64}
                        />
                      </div>
                      <CardTitle className='text-lg'>
                        <span>{game.name} İstatistikleri</span>
                      </CardTitle>
                      <div className='flex justify-center'>
                        <Badge
                          variant={
                            game.status === "Aktif" ? "default" : "secondary"
                          }
                          className={
                            game.status === "Aktif"
                              ? "bg-primary hover:bg-primary/80"
                              : ""
                          }>
                          {game.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-muted-foreground mb-2'>
                        {game.players} aktif oyuncu
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {game.description}
                      </p>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          className='relative bg-background py-20 px-4'
          aria-labelledby='how-it-works'>
          <div className='max-w-6xl mx-auto'>
            <header className='text-center mb-16'>
              <h2
                id='how-it-works'
                className='text-3xl md:text-4xl font-bold mb-4'>
                Oyun İstatistiklerine Nasıl Ulaşılır?
              </h2>
              <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
                Sadece 3 basit adımda CS2, Faceit, Valorant oyun
                istatistiklerine ulaş. Ücretsiz analiz, detaylı raporlar ve
                performans takibi.
              </p>
            </header>

            <div className='grid md:grid-cols-3 gap-8'>
              <article className='text-center'>
                <div className='mx-auto mb-6 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold'>
                  1
                </div>
                <h3 className='text-xl font-semibold mb-4'>
                  Oyun ve Kullanıcı Seç
                </h3>
                <p className='text-muted-foreground'>
                  CS2, Faceit, Valorant veya Apex Legends'dan birini seç. Steam
                  ID, Faceit kullanıcı adı veya oyun içi nick'ini gir.
                </p>
              </article>

              <article className='text-center'>
                <div className='mx-auto mb-6 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold'>
                  2
                </div>
                <h3 className='text-xl font-semibold mb-4'>
                  İstatistikleri İncele
                </h3>
                <p className='text-muted-foreground'>
                  K/D oranı, headshot yüzdesi, ELO geçmişi, rank analizi ve maç
                  performansını detaylı olarak incele.
                </p>
              </article>

              <article className='text-center'>
                <div className='mx-auto mb-6 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold'>
                  3
                </div>
                <h3 className='text-xl font-semibold mb-4'>
                  Performansını Geliştir
                </h3>
                <p className='text-muted-foreground'>
                  Zayıf yönlerini tespit et, güçlü yanlarını pekiştir. Hedefler
                  belirle ve sürekli gelişim sağla.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          className='relative bg-muted/30 py-20 px-4'
          aria-labelledby='faq-section'>
          <div className='max-w-4xl mx-auto'>
            <header className='text-center mb-16'>
              <h2
                id='faq-section'
                className='text-3xl md:text-4xl font-bold mb-4'>
                Sıkça Sorulan Sorular
              </h2>
              <p className='text-lg text-muted-foreground'>
                BigStats.co hakkında merak ettiğin her şey
              </p>
            </header>

            <div className='space-y-6'>
              <article className='bg-background rounded-lg p-6'>
                <h3 className='text-lg font-semibold mb-2'>
                  BigStats.co ücretsiz mi?
                </h3>
                <p className='text-muted-foreground'>
                  Evet, temel oyun istatistikleri ve performans analizi tamamen
                  ücretsizdir.{" "}
                </p>
              </article>

              <article className='bg-background rounded-lg p-6'>
                <h3 className='text-lg font-semibold mb-2'>
                  Hangi oyunları destekliyorsunuz?
                </h3>
                <p className='text-muted-foreground'>
                  Şu anda Faceit aktif olarak desteklenmektedir. CS2, Valorant
                  ve Apex Legends desteği yakında eklenecektir.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className='relative bg-primary/5 py-20 px-4'
          aria-labelledby='cta-section'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2
              id='cta-section'
              className='text-3xl md:text-4xl font-bold mb-6'>
              Oyun Performansını Artırmaya Hazır mısın?
            </h2>
            <p className='text-lg text-muted-foreground mb-8 max-w-3xl mx-auto'>
              Hemen başla ve CS2, Faceit, Valorant oyun istatistiklerini analiz
              ederek rakiplerinin önüne geç. Ücretsiz analiz ve detaylı
              performans raporları seni bekliyor.
            </p>
            <Button
              size='lg'
              className='text-lg px-8 py-3'
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Ücretsiz Analiz Başlat
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
