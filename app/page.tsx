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
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const backgroundImages = [
    "https://images8.alphacoders.com/132/1329760.jpeg",
    "https://cdn.wallpapersafari.com/77/28/c4DmOo.jpg",
  ];
  const [bgIndex, setBgIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <main className='relative flex flex-col justify-center items-center min-h-screen'>
      {/* Background Image Carousel */}
      <div className='absolute inset-0 z-[-1]'>
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
      <section className='w-full max-w-2xl flex flex-col items-center justify-center mt-14 mb-12 gap-6 bg-transparent rounded-none shadow-none p-0 border-none relative overflow-visible'>
        {/* Dekoratif çizgi ve ikon kaldırıldı */}
        <span className='mb-2 px-5 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold tracking-widest uppercase shadow-sm z-10'>
          Oyun İstatistik Platformu
        </span>
        <h1
          className='text-4xl sm:text-6xl font-extrabold text-center bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent animate-gradient-x drop-shadow-xl z-10'
          style={{
            backgroundImage:
              "linear-gradient(90deg, #53fc18 0%, #53fc18 40%, #fff 50%, #53fc18 60%, #53fc18 100%)",
          }}>
          Oyunun İstatistiği, Senin Gücün!
          <br />
        </h1>
        <p className='mt-2 text-lg sm:text-xl text-muted-foreground text-center max-w-2xl z-10'>
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
      <div className='bg-background rounded-2xl flex flex-row justify-center items-center w-1/3 border-2 border-gray-40 hover:border-primary'>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Oyun sec' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='CS2'>cs2</SelectItem>
            <SelectItem value='Faceit'>Faceit</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder='Arama yap...' className='w-full  border-none' />
        <Button className='rounded-none rounded-br-xl rounded-tr-xl hover:cursor-pointer'>
          Ara
        </Button>
      </div>
      {/* Arama Bar end */}
    </main>
  );
}
