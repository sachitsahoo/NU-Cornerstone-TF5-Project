/** One random Boston-themed case per playthrough. */
export const BOSTON_CASE_IDS = [
  "charles_river",
  "boston_common",
  "south_end",
  "newbury_street",
] as const;

export type BostonCaseId = (typeof BOSTON_CASE_IDS)[number];

export function pickRandomCase(): BostonCaseId {
  const i = Math.floor(Math.random() * BOSTON_CASE_IDS.length);
  return BOSTON_CASE_IDS[i]!;
}
