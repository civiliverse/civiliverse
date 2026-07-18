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
  "regulates",
] as const;
export type EdgeType = (typeof EDGE_TYPES)[number];

export const CULTURES = [
  "sinic",
  "indic",
  "islamic",
  "western",
  "greco-roman",
  "ancient-near-east",
  "americas",
  "africa",
  "steppe",
  "sea-oceania",
  "trans",
] as const;
export type Culture = (typeof CULTURES)[number];

export const CULTURE_LABELS: Readonly<Record<Culture, { readonly zh: string; readonly en: string }>> = {
  sinic: { zh: "中华", en: "Sinic" },
  indic: { zh: "印度—南亚", en: "Indic" },
  islamic: { zh: "伊斯兰世界", en: "Islamic" },
  western: { zh: "欧洲—西方", en: "Western" },
  "greco-roman": { zh: "希腊—罗马", en: "Greco-Roman" },
  "ancient-near-east": { zh: "古代近东", en: "Ancient Near East" },
  americas: { zh: "美洲原住民", en: "Americas" },
  africa: { zh: "撒哈拉以南非洲", en: "Africa" },
  steppe: { zh: "中亚—草原", en: "Steppe" },
  "sea-oceania": { zh: "东南亚—大洋洲", en: "SE Asia & Oceania" },
  trans: { zh: "跨文明", en: "Transcultural" },
};

export const NODE_TIERS = ["major", "minor"] as const;
export const NODE_STATUSES = ["draft", "ai-reviewed", "editor-approved"] as const;
export const ICON_SOURCES = ["game-icons", "ai", "custom"] as const;
export const ICON_STATUSES = ["final", "needs-ai", "tentative"] as const;
export const CONFIDENCE_LEVELS = ["high", "medium", "low"] as const;
export const DISASTER_SUBTYPES = ["env", "famine", "accident", "atrocity"] as const;

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

export const ENDPOINT_RULES: Readonly<Record<EdgeType, EndpointRule>> = {
  enables: {
    source: ["tech", "idea", "person", "wonder"],
    target: ["tech", "idea", "wonder"],
    directed: true,
  },
  derives: {
    source: ["tech", "idea", "wonder"],
    target: ["tech", "idea", "wonder"],
    directed: true,
  },
  applies: {
    source: ["idea"],
    target: ["tech", "wonder"],
    directed: true,
  },
  informs: {
    source: ["tech", "wonder"],
    target: ["idea"],
    directed: true,
  },
  inspires: {
    source: all,
    target: ["idea", "person", "wonder"],
    directed: true,
  },
  contributed: {
    source: ["person"],
    target: ["tech", "idea", "wonder"],
    directed: true,
  },
  patronized: {
    source: ["person"],
    target: ["person", "tech", "idea", "wonder"],
    directed: true,
  },
  parallels: { source: all, target: all, directed: false },
  causes: { source: ["tech", "idea", "wonder"], target: ["disaster"], directed: true },
  regulates: { source: ["idea"], target: ["tech", "wonder"], directed: true },
};

export function isEndpointCombinationAllowed(
  edgeType: EdgeType,
  sourceType: NodeType,
  targetType: NodeType,
): boolean {
  const rule = ENDPOINT_RULES[edgeType];
  return rule.source.includes(sourceType) && rule.target.includes(targetType);
}
