"use client";

import { FacitCS2GameChart } from "@/components/FacitCS2GameChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  FaceitPlayerDetailResponse,
  FacitCS2GameStatsResponse,
} from "@/types/faceit.types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FaceitPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<FaceitPlayerDetailResponse>();
  const router = useRouter();
  const [gameStats, setGameStats] = useState<FacitCS2GameStatsResponse | null>(
    null
  );

  useEffect(() => {
    bringUser();
    bringGameStats("cs2");
  }, [id]);

  const bringUser = async () => {
    const res = await fetch(`/api/faceit/${id}/user`, {
      method: "GET",
    });
    const data = (await res.json()) as FaceitPlayerDetailResponse;
    const playerId = data.player_id;
    if (playerId !== "") {
      setUser(data);
    } else {
      router.push("/404");
    }
  };

  const countryCodeToFlagEmoji = (countryCode?: string) => {
    if (!countryCode) return "";
    // ISO 3166-1 alpha-2 kodunu emojiye çevir
    return countryCode
      .toUpperCase()
      .split("")
      .map(function (char) {
        return String.fromCodePoint(127397 + char.charCodeAt(0));
      })
      .join("");
  };

  const bringGameStats = async (game: string) => {
    const res = await fetch(`/api/faceit/${id}/user/${game}`, {
      method: "GET",
    });
    const data = (await res.json()) as FacitCS2GameStatsResponse;
    if (data) {
      setGameStats(data);
      console.log(data.items);
    } else {
      router.push("/404");
    }
  };

  return (
    <div className='flex flex-col min-h-screen p-5 gap-12'>
      {/* Profil ve arka plan section */}
      <div
        className={
          "h-[420px] sm:h-[480px] w-full items-center justify-between rounded-lg overflow-hidden flex flex-col sm:flex-row bg-no-repeat bg-cover bg-center relative mb-10 transition-all duration-700" +
          (user?.cover_image ? "" : " animate-gradient-bg")
        }
        style={
          user?.cover_image
            ? { backgroundImage: `url(${user.cover_image})` }
            : {
                backgroundImage:
                  "linear-gradient(270deg, var(--primary), var(--primary-foreground), var(--primary), var(--primary-foreground))",
                backgroundSize: "400% 400%",
              }
        }>
        <style jsx global>{`
          @keyframes gradientBG {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient-bg {
            animation: gradientBG 8s ease-in-out infinite;
          }
        `}</style>
        {/* Karartma overlay */}
        <div className='absolute inset-0 bg-black/60 pointer-events-none'></div>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-6 w-full px-2 sm:px-0'>
          {/* Profil Kartı */}
          <Card className='h-fit backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:bg-white/20'>
            <CardContent>
              {/* Avatar */}
              <div className='flex items-center space-x-4'>
                <Avatar className='w-32 h-32'>
                  <AvatarImage src={user?.avatar} alt={user?.nickname} />
                  <AvatarFallback>{user?.nickname?.charAt(0)}</AvatarFallback>
                </Avatar>
                {/* Avatar end */}
                <div>
                  <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                    {user?.nickname}
                    {user?.verified && (
                      <span
                        title='Doğrulanmış oyuncu'
                        className='inline-flex items-center'>
                        <svg
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <circle
                            cx='10'
                            cy='10'
                            r='10'
                            className='fill-primary'
                          />
                          <path
                            d='M6.5 10.5L9 13L14 8'
                            stroke='black'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className='text-sm text-muted-foreground flex items-center gap-1'>
                    {user?.country && (
                      <span>{countryCodeToFlagEmoji(user.country)}</span>
                    )}
                    {user?.country}
                  </CardDescription>
                </div>
              </div>
              {/* Avatar end */}
            </CardContent>
            <CardFooter>
              <div className='flex flex-wrap gap-2'>
                {user?.memberships && user.memberships.length > 0 ? (
                  user.memberships.map((membership, idx) => (
                    <span
                      key={membership + idx}
                      className='inline-block px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30'>
                      {membership.charAt(0).toUpperCase() + membership.slice(1)}
                    </span>
                  ))
                ) : (
                  <span className='text-xs text-muted-foreground'>Free</span>
                )}
              </div>
            </CardFooter>
          </Card>
          {/* Player Info */}
          {user?.games && user.games.cs2 && (
            <div className='flex flex-col gap-4 z-20'>
              {/* Level Kartı */}
              <Card className='w-28 h-20 flex flex-col items-center justify-center bg-white/20 border border-white/30 shadow-md backdrop-blur-md'>
                <CardContent className='flex flex-col items-center justify-center p-2'>
                  <span className='text-xs text-muted-foreground'>Level</span>
                  <span className='text-2xl font-bold text-primary mt-1'>
                    {user.games.cs2.skill_level}
                  </span>
                </CardContent>
              </Card>
              {/* Elo Kartı */}
              <Card className='w-28 h-20 flex flex-col items-center justify-center bg-white/20 border border-white/30 shadow-md backdrop-blur-md'>
                <CardContent className='flex flex-col items-center justify-center p-2'>
                  <span className='text-xs text-muted-foreground'>Elo</span>
                  <span className='text-2xl font-bold text-primary mt-1'>
                    {user.games.cs2.faceit_elo}
                  </span>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        {/* Karartma overlay end */}
      </div>

      {/* Game Stats Section */}
      <section className='w-full flex flex-row items-stretch justify-center gap-6 md:gap-8 max-w-6xl mx-auto'>
        {/* Info Card Left - Sticky */}
        <div className='w-full max-w-xs flex flex-col gap-4 mx-auto md:mx-0 sticky top-36 self-start h-fit'>
          <Card className='backdrop-blur-md bg-white/10 border border-white/20 shadow-lg w-full'>
            <CardContent className='p-6 flex flex-col items-center justify-center gap-2 w-full'>
              <span className='text-lg font-semibold text-primary'>
                Maç Sonuçları
              </span>
              {/* Win/Lose hesaplama ve tablo */}
              {gameStats && gameStats.items && gameStats.items.length > 0 ? (
                (() => {
                  const winCount = gameStats.items.filter(
                    (m) => m.stats && m.stats.Result === "1"
                  ).length;
                  const loseCount = gameStats.items.filter(
                    (m) => m.stats && m.stats.Result === "0"
                  ).length;
                  return (
                    <div className='flex flex-col items-center gap-2 w-full'>
                      <div className='flex gap-3 w-full justify-center'>
                        <span className='text-green-500 font-bold text-xl bg-green-500/10 px-3 py-1 rounded-lg border border-green-500/20'>
                          {winCount} Win
                        </span>
                        <span className='text-red-500 font-bold text-xl bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/20'>
                          {loseCount} Lose
                        </span>
                      </div>
                      <div className='w-full mt-2 overflow-x-auto'>
                        <table className='min-w-full text-xs text-left border-separate border-spacing-y-1'>
                          <thead>
                            <tr className='text-muted-foreground'>
                              <th className='px-2 py-1'>Tarih</th>
                              <th className='px-2 py-1'>Sonuç</th>
                              <th className='px-2 py-1'>K/R</th>
                              <th className='px-2 py-1'>K/D</th>
                            </tr>
                          </thead>
                          <tbody>
                            {gameStats.items.slice(0, 8).map((m, idx) => {
                              const tarih = (() => {
                                const ts = m.stats["Match Finished At"];
                                if (!ts) return "-";
                                const t =
                                  ts.toString().length === 13 ? ts : ts * 1000;
                                return new Date(t).toLocaleDateString("tr-TR", {
                                  month: "short",
                                  day: "numeric",
                                });
                              })();
                              const sonuc =
                                m.stats.Result === "1"
                                  ? "Win"
                                  : m.stats.Result === "0"
                                  ? "Lose"
                                  : "-";
                              const kr = m.stats["K/R Ratio"] ?? "-";
                              const kd = m.stats["K/D Ratio"] ?? "-";
                              return (
                                <tr
                                  key={idx}
                                  className='rounded bg-white/10 hover:bg-white/20 transition-all'>
                                  <td className='px-2 py-1 rounded-l whitespace-nowrap'>
                                    {tarih}
                                  </td>
                                  <td
                                    className={
                                      "px-2 py-1 font-semibold " +
                                      (sonuc === "Win"
                                        ? "text-green-500"
                                        : sonuc === "Lose"
                                        ? "text-red-500"
                                        : "")
                                    }>
                                    {sonuc}
                                  </td>
                                  <td className='px-2 py-1 text-primary font-semibold'>
                                    {kr}
                                  </td>
                                  <td className='px-2 py-1 text-cyan-500 font-semibold rounded-r'>
                                    {kd}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <span className='text-xs text-muted-foreground'>Veri yok</span>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Chartlar - Alt alta, sol sabit */}
        <div className='flex-1 min-w-0 flex flex-col gap-6 mt-6 md:mt-0'>
          {/* Kill/Death & verimlilik */}
          <FacitCS2GameChart
            dataKey='Kills'
            label='Toplam Kill (Öldürme)'
            stats={gameStats ?? null}
          />
          <FacitCS2GameChart
            dataKey='Deaths'
            label='Toplam Death (Ölme)'
            stats={gameStats ?? null}
          />
          <FacitCS2GameChart
            dataKey='K/D Ratio'
            label='K/D Oranı (Kill/Death)'
            stats={gameStats ?? null}
          />
          <FacitCS2GameChart
            dataKey='K/R Ratio'
            label='K/R Oranı (Kill/Round)'
            stats={gameStats ?? null}
          />

          {/* Hasar & etkinlik */}
          <FacitCS2GameChart
            dataKey='ADR'
            label='ADR (Round Başına Ortalama Hasar)'
            stats={gameStats ?? null}
          />
          <FacitCS2GameChart
            dataKey='Rounds'
            label='Oynanan Round Sayısı'
            stats={gameStats ?? null}
          />

          {/* Headshot istatistikleri */}
          <FacitCS2GameChart
            dataKey='Headshots'
            label='Toplam Headshot'
            stats={gameStats ?? null}
          />
          <FacitCS2GameChart
            dataKey='Headshots %'
            label='Headshot Yüzdesi (%)'
            stats={gameStats ?? null}
          />

          {/* Destek & ödüller */}
          <FacitCS2GameChart
            dataKey='Assists'
            label='Asist Sayısı'
            stats={gameStats ?? null}
          />

          {/* Çoklu kill’ler */}
          <FacitCS2GameChart
            dataKey='Double Kills'
            label='2 Kişilik Kill (Double Kill)'
            stats={gameStats ?? null}
          />
          <FacitCS2GameChart
            dataKey='Triple Kills'
            label='3 Kişilik Kill (Triple Kill)'
            stats={gameStats ?? null}
          />
          <FacitCS2GameChart
            dataKey='Quadro Kills'
            label='4 Kişilik Kill (Quadro Kill)'
            stats={gameStats ?? null}
          />
          <FacitCS2GameChart
            dataKey='Penta Kills'
            label='5 Kişilik Kill (Penta Kill)'
            stats={gameStats ?? null}
          />

          {/* Mevcut eklediklerin */}
          <FacitCS2GameChart
            dataKey='K/D Ratio'
            label='K/D Oranı (Kill/Death)'
            stats={gameStats ?? null}
          />
          <FacitCS2GameChart
            dataKey='K/R Ratio'
            label='K/R Oranı (Kill/Round)'
            stats={gameStats ?? null}
          />
          <FacitCS2GameChart
            dataKey='ADR'
            label='ADR (Round Başına Ortalama Hasar)'
            stats={gameStats ?? null}
          />

          {/* İstediğiniz kadar chart ekleyebilirsiniz */}
        </div>
      </section>
      {/* Game Stats section end */}
    </div>
  );
}
