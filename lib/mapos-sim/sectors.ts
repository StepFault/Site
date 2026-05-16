/** Vertical demos shown in the MAPOS UI simulator (deterministic copy only). */
export const MAPOS_SECTORS = ["legal", "health", "security", "finance"] as const;
export type MaposSector = (typeof MAPOS_SECTORS)[number];
