import { expandSearchTerms, readGameIconIndex } from "./indexer.js";
import type { GameIconRecord, GameIconSearchResult } from "./types.js";

function scoreIcon(icon: GameIconRecord, terms: string[], rawQuery: string): number {
  const name = icon.name.toLowerCase();
  const haystack = new Set([icon.id.toLowerCase(), name, icon.author_slug.toLowerCase(), ...icon.keywords]);
  let score = icon.id.toLowerCase() === rawQuery.toLowerCase() ? 1000 : 0;
  for (const term of terms) {
    if (name === term) score += 120;
    else if (name.startsWith(term)) score += 70;
    else if (name.includes(term)) score += 45;
    if (haystack.has(term)) score += 35;
    else if ([...haystack].some((candidate) => candidate.includes(term))) score += 12;
  }
  return score;
}

export async function searchGameIcons(options: {
  indexFile: string;
  query: string;
  limit?: number;
}): Promise<GameIconSearchResult[]> {
  const index = await readGameIconIndex(options.indexFile);
  const terms = expandSearchTerms(options.query);
  if (terms.length === 0) return [];
  return index.icons
    .map((icon) => ({ ...icon, score: scoreIcon(icon, terms, options.query) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.id.localeCompare(right.id))
    .slice(0, options.limit ?? 20);
}
