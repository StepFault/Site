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

describe("POST /api/contact", () => {
  beforeEach(() => {
    mockInsert.mockClear();
  });

  it("returns 200 and success when body is valid and Supabase is available", async () => {
    const req = jsonRequest({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "This is a test message with enough characters to pass validation.",
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({
      success: true,
      message: "Thank you for your message. We'll be in touch soon.",
    });
    expect(mockInsert).toHaveBeenCalledWith({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "This is a test message with enough characters to pass validation.",
    });
  });

  it("returns 422 when message is too short", async () => {
    const req = jsonRequest({
      name: "Jane",
      email: "jane@example.com",
      message: "Short",
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
