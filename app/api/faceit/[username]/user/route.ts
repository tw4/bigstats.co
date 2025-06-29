import {
  FaceitPlayerDetailResponse,
  FaceitPlayerResponse,
} from "@/types/faceit.types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const username = (await params).username;

  const res = await fetch(
    `https://open.faceit.com/data/v4/players/${username}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.FACIT_API_KEY}`,
      },
    }
  );

  const items: FaceitPlayerDetailResponse = await res.json();

  if (!res.ok || items.player_id === "") {
    return new Response("Player not found", { status: 404 });
  }

  return new Response(JSON.stringify(items), {
    status: 200,
  });
}
