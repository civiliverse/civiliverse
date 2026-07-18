export interface GameIconRecord {
  id: string;
  name: string;
  author: string;
  author_slug: string;
  relative_path: string;
  preview_path: string;
  source_url: string;
  license: "CC BY 3.0";
  keywords: string[];
}

export interface GameIconIndex {
  schema_version: 1;
  generated_at: string;
  source_repository: string;
  source_commit?: string;
  icon_count: number;
  icons: GameIconRecord[];
}

export interface GameIconSearchResult extends GameIconRecord {
  score: number;
}
