import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

const mockInsert = vi.fn();

vi.mock("@/lib/supabase/admin", () => ({
  getSupabaseAdmin: vi.fn(() => ({
    from: () => ({
      insert: (row: unknown) => {
        mockInsert(row);
        return Promise.resolve({ data: null, error: null });
      },
    }),
  })),
}));

vi.mock("@/lib/email", () => ({
  sendContactNotification: vi.fn().mockResolvedValue(undefined),
}));

function jsonRequest(body: object): NextRequest {
  return new NextRequest("http://localhost:3000/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

const validIntakeBody = {
  executiveName: "Jane Doe",
  company: "Example Corp",
  corporateEmail: "jane@examplecorp.com",
  fundingStage: "seed",
  immediateTechnicalHurdle:
    "We need deterministic orchestration with human-in-the-loop gates before production.",
  engagementBudgetRange: "50k_plus",
} as const;

describe("POST /api/contact", () => {
  beforeEach(() => {
    mockInsert.mockClear();
  });

  it("returns 200 and success when body is valid and Supabase is available", async () => {
    const req = jsonRequest({ ...validIntakeBody });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({
      success: true,
      message:
        "Intake received. A principal will review your submission and respond if there is a mutual fit.",
    });
    expect(mockInsert).toHaveBeenCalledWith({
      name: validIntakeBody.executiveName,
      email: validIntakeBody.corporateEmail,
      message: validIntakeBody.immediateTechnicalHurdle,
      company: validIntakeBody.company,
      funding_stage: validIntakeBody.fundingStage,
      budget_range: validIntakeBody.engagementBudgetRange,
    });
  });

  it("returns 422 when technical hurdle is too short", async () => {
    const req = jsonRequest({
      ...validIntakeBody,
      immediateTechnicalHurdle: "Short",
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(422);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Validation failed.");
    expect(Array.isArray(data.details)).toBe(true);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("returns 400 when body is not valid JSON", async () => {
    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: "not json",
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.error).toBe("Request body must be valid JSON.");
    expect(mockInsert).not.toHaveBeenCalled();
  });
});
