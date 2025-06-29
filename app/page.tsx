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
import { FaceitPlayer, FaceitPlayerResponse } from "@/types/faceit.types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
      }, 2000); // fade out süresi
    }
    intervalRef.current = setInterval(startTransition, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line
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

  return (
    <main className='relative flex flex-col justify-center items-center min-h-screen'>
      {/* Background Image Carousel */}
      <div className='absolute inset-0 z-[-1] select-none'>
        {/* Eski görsel ve overlay, sadece farklıysa göster */}
        {prevIndex !== bgIndex && (
          <div className='absolute inset-0 w-full h-full'>
            <img
              src={backgroundImages[prevIndex]}
              alt='Background-prev'
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
        {/* Yeni görsel ve overlay */}
        <div className='absolute inset-0 w-full h-full'>
          <img
            src={backgroundImages[bgIndex]}
            alt='Background'
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
      {/* Background Image end */}
      {/* Hero Slogan Modern */}
      <section className='w-full max-w-2xl flex flex-col items-center justify-center mt-8 sm:mt-14 mb-6 sm:mb-12 gap-3 sm:gap-6 bg-transparent rounded-none shadow-none p-0 border-none relative overflow-visible px-2 sm:px-0'>
        {/* Dekoratif çizgi ve ikon kaldırıldı */}
        <span className='mb-2 px-4 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold tracking-widest uppercase shadow-sm z-10'>
          Oyun İstatistik Platformu
        </span>
        <h1
          className='text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-gradient-x drop-shadow-xl z-10 leading-tight'
          style={{
            backgroundImage:
              "linear-gradient(90deg, #53fc18 0%, #53fc18 40%, #fff 50%, #53fc18 60%, #53fc18 100%)",
          }}>
          Oyunun İstatistiği, Senin Gücün!
        </h1>
        <p className='mt-2 text-base xs:text-lg sm:text-xl text-muted-foreground text-center max-w-2xl z-10'>
          <span
            className='inline-block bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-gradient-x'
            style={{
              backgroundImage:
                "linear-gradient(90deg, #53fc18 0%, #53fc18 40%, #fff 50%, #53fc18 60%, #53fc18 100%)",
            }}>
            BigStats.co
          </span>
          {
            " ile oyun performansını analiz et, rakiplerinin önüne geç. Tüm istatistikler, tek platformda."
          }
        </p>
      </section>
      {/* Hero Slogan End */}
      {/* Arama Bar */}
      <div className='bg-background rounded-2xl flex flex-col sm:flex-row justify-center items-center w-full max-w-lg border border-gray-40 hover:border-primary sm:border-2 mx-auto px-2 py-2 gap-2 sm:gap-0 shadow-lg sm:shadow-xl transition-all duration-300'>
        <Select onValueChange={(value) => setSelectedGame(value)}>
          <SelectTrigger className='w-full sm:w-[120px] md:w-[140px] text-sm sm:text-base'>
            <SelectValue placeholder='Oyun seç' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem disabled value='CS2'>
              CS2
            </SelectItem>
            <SelectItem value='Faceit'>Faceit</SelectItem>
          </SelectContent>
        </Select>
        <Input
          onChange={(e) => setUser(e.target.value)}
          placeholder='Kullanıcı adı...'
          className='w-full border-none sm:rounded-none sm:rounded-l-2xl text-sm sm:text-base focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-200'
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchButton();
          }}
        />
        <Button
          onClick={handleSearchButton}
          className='w-full sm:w-auto mt-1 sm:mt-0 rounded-2xl sm:rounded-none sm:rounded-br-2xl sm:rounded-tr-2xl hover:cursor-pointer text-sm sm:text-base px-6 py-2 sm:px-4 sm:py-2 transition-all duration-200'>
          Ara
        </Button>
      </div>
      {/* Arama Bar end */}
    </main>
  );
}
