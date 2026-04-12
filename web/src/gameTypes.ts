/** Mirrors `characters.json` from GET /api/characters */
export type CharacterJson = {
  uid: string;
  tag_ids: string[];
  name: string;
  role: string;
  description: string;
  /** Legacy / display; at runtime set from alibi pools + round picks. */
  suspicious_detail: string;
  /** Three short alibis when this character is innocent this round. */
  alibis_innocent: string[];
  /** Three short alibis when this character is the culprit (misleading cover stories). */
  alibis_guilty: string[];
  innocent_explanation: string;
  culprit_explanation: string;
  image: string;
  led_color: number[];
  sound_theme?: string;
  /** Which alibi slot (0–2) is shown this round (set when the scene is built). */
  round_alibi_index?: 0 | 1 | 2;
  /** True if this character is the round culprit (set when the scene is built). */
  round_alibi_guilty?: boolean;
};

export type CharactersApiResponse = {
  /** If empty, culprit is chosen at random each play. Otherwise first uid fixes the culprit. */
  round_culprits: string[];
  characters: CharacterJson[];
};

/** Accusation reveal modal (GET characters + runtime picks). */
export type RevealState = {
  correct: boolean;
  picked: CharacterJson;
  culprit: CharacterJson;
};
