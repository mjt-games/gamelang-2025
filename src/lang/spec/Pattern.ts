
export const PATTERN_SYMBOLS = ["*"] as const;

export type Pattern = (typeof PATTERN_SYMBOLS)[number];
