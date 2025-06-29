import {
  FacitCS2GameStatsResponse,
  FaceitPlayerDetailResponse,
  FaceitPlayerResponse,
} from "@/types/faceit.types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string; game: string }> }
) {
  const username = (await params).username;
  const game = (await params).game;

  const res = await fetch(
    `https://open.faceit.com/data/v4/players/${username}/games/${game}/stats`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.FACIT_API_KEY}`,
      },
    }
  );

  const items: FacitCS2GameStatsResponse = await res.json();

  if (!res.ok || items.items.length === 0) {
    return new Response("Player not found", { status: 404 });
  }

  return new Response(JSON.stringify(items), {
    status: 200,
  });
}
