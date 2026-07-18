export const SCHEMA_VERSION = 1 as const;

export const NODE_TYPES = ["tech", "idea", "person", "wonder", "disaster"] as const;
export type NodeType = (typeof NODE_TYPES)[number];

export const EDGE_TYPES = [
  "enables",
  "derives",
  "applies",
  "informs",
  "inspires",
  "contributed",
  "patronized",
  "parallels",
  "causes",
] as const;
export type EdgeType = (typeof EDGE_TYPES)[number];

/**
 * PROVISIONAL: the brief fixes the count at 11 but did not include the labels.
 * Keep this list centralized so the coordinator can freeze it in one edit.
 */
export const CULTURES = [
  "east_asia",
  "south_asia",
  "southeast_asia",
  "central_asia",
  "west_asia_north_africa",
  "europe",
  "sub_saharan_africa",
  "north_america",
  "latin_america_caribbean",
  "oceania",
  "global_cross_cultural",
] as const;
export type Culture = (typeof CULTURES)[number];

export const IMAGE_LICENSES = [
  "Public Domain",
  "CC0",
  "CC BY 1.0",
  "CC BY 2.0",
  "CC BY 2.5",
  "CC BY 3.0",
  "CC BY 4.0",
  "CC BY-SA 1.0",
  "CC BY-SA 2.0",
  "CC BY-SA 2.5",
  "CC BY-SA 3.0",
  "CC BY-SA 4.0",
] as const;
export type ImageLicense = (typeof IMAGE_LICENSES)[number];

export interface EndpointRule {
  readonly source: readonly NodeType[];
  readonly target: readonly NodeType[];
  readonly directed: boolean;
}

const all = NODE_TYPES;

/**
 * PROVISIONAL except for `parallels` being undirected and `causes` targeting a
 * disaster. The table is deliberately data, not validator control flow, so a
 * frozen coordinator decision is straightforward to review and replace.
 */
export const ENDPOINT_RULES: Readonly<Record<EdgeType, EndpointRule>> = {
  enables: {
    source: ["tech", "idea", "person"],
    target: ["tech", "idea", "wonder"],
    directed: true,
  },
  derives: {
    source: ["tech", "idea"],
    target: ["tech", "idea"],
    directed: true,
  },
  applies: {
    source: ["tech", "idea"],
    target: ["tech", "wonder"],
    directed: true,
  },
  informs: {
    source: all,
    target: ["tech", "idea", "person"],
    directed: true,
  },
  inspires: {
    source: all,
    target: ["tech", "idea", "person", "wonder"],
    directed: true,
  },
  contributed: {
    source: ["person"],
    target: ["tech", "idea", "wonder"],
    directed: true,
  },
  patronized: {
    source: ["person"],
    target: ["person", "tech", "wonder"],
    directed: true,
  },
  parallels: { source: all, target: all, directed: false },
  causes: { source: all, target: ["disaster"], directed: true },
};

export function isEndpointCombinationAllowed(
  edgeType: EdgeType,
  sourceType: NodeType,
  targetType: NodeType,
): boolean {
  const rule = ENDPOINT_RULES[edgeType];
  return rule.source.includes(sourceType) && rule.target.includes(targetType);
}
