/** Mirrors `characters.json` from GET /api/characters */
export type CharacterJson = {
  uid: string;
  tag_ids: string[];
  name: string;
  role: string;
  description: string;
  suspicious_detail: string;
  innocent_explanation: string;
  culprit_explanation: string;
  image: string;
  led_color: number[];
};

export type CharactersApiResponse = {
  round_culprits: string[];
  characters: CharacterJson[];
};

