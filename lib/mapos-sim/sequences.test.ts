import { describe, expect, it } from "vitest";
import {
  MAPOS_SIMULATION_SEQUENCE,
  MAPOS_SECTORS,
  buildFullSimulationSequence,
  buildSectorSequence,
} from "./index";

describe("mapos-sim sequences", () => {
  it("keeps a stable full trace length", () => {
    const rebuilt = buildFullSimulationSequence();
    expect(rebuilt).toEqual(MAPOS_SIMULATION_SEQUENCE);
    expect(MAPOS_SIMULATION_SEQUENCE.length).toBe(129);
  });

  it("produces four verification gates (one per sector)", () => {
    const gates = MAPOS_SIMULATION_SEQUENCE.filter((l) => l.type === "verification");
    expect(gates).toHaveLength(MAPOS_SECTORS.length);
  });

  it("starts each sector with runtime initialization", () => {
    for (const sector of MAPOS_SECTORS) {
      const seq = buildSectorSequence(sector);
      expect(seq[0]?.text).toContain("MAPOS Runtime");
    }
  });
});
