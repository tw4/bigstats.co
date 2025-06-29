export interface FacitCS2GameStatsResponse {
  items: Item[];
  start: number;
  end: number;
}

export interface Item {
  stats: Stats;
}

export interface Stats {
  Nickname: string;
  "Updated At": string;
  Rounds: string;
  "Penta Kills": string;
  "Overtime score": string;
  "Match Round": string;
  "Double Kills": string;
  "Quadro Kills": string;
  "Match Finished At": number;
  Kills: string;
  Deaths: string;
  Region: string;
  "Competition Id": string;
  "Headshots %": string;
  Team: string;
  ADR: string;
  "First Half Score": string;
  Game: string;
  Map: string;
  "Second Half Score": string;
  Assists: string;
  "Triple Kills": string;
  Winner: string;
  MVPs: string;
  "K/D Ratio": string;
  Score: string;
  Headshots: string;
  "Created At": string;
  "K/R Ratio": string;
  "Final Score": string;
  "Best Of": string;
  "Player Id": string;
  Result: string;
  "Match Id": string;
  "Game Mode": string;
  [key: string]: string | number | undefined;
}

export type FaceitPlayerGameDetail = {
  faceit_elo: number;
  game_player_id: string;
  game_player_name: string;
  game_profile_id: string;
  region: string;
  regions: any; // null veya obje olabilir, detay için güncellenebilir
  skill_level: number;
  skill_level_label: string;
};

export type FaceitPlayerDetailResponse = {
  activated_at: string;
  avatar: string;
  country: string;
  cover_featured_image: string;
  cover_image: string;
  faceit_url: string;
  friends_ids: string[];
  games: Record<string, FaceitPlayerGameDetail>;
  infractions: any; // null veya obje olabilir, detay için güncellenebilir
  membership_type: string;
  memberships: string[];
  new_steam_id: string;
  nickname: string;
  platforms: Record<string, string>;
  player_id: string;
  settings: {
    language: string;
  };
  steam_id_64: string;
  steam_nickname: string;
  verified: boolean;
};
export type FaceitPlayerResponse = {
  items: FaceitPlayer[];
  start: number;
  end: number;
};
export type FaceitGame = {
  name: string;
  skill_level: string;
};

export type FaceitPlayer = {
  player_id: string;
  nickname: string;
  status: string;
  games: FaceitGame[];
  country: string;
  verified: boolean;
  avatar: string;
};
