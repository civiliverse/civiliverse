import type { ImageLicense } from "../../schema/index.js";

export interface CommonsCandidate {
  page_id: number;
  title: string;
  description_url: string;
  original_url: string;
  mime: string;
  width?: number;
  height?: number;
  artist: string;
  credit: string;
  license: ImageLicense | null;
  license_raw: string;
  eligible: boolean;
  rejection_reasons: string[];
}

export interface CommonsCandidateManifest {
  schema_version: 1;
  generated_at: string;
  query: string;
  api: string;
  candidates: CommonsCandidate[];
}

export interface CommonsAttribution {
  page_id: number;
  title: string;
  source_url: string;
  original_url: string;
  artist: string;
  credit: string;
  license: ImageLicense;
  ai_generated: false;
  original_file: string;
  derivatives: Array<{ width: number; file: string }>;
}
