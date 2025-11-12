import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiRequest } from "@/lib/api";

const toastMock = vi.fn();
vi.mock("sonner", () => ({
    toast: (...args: any[]) => toastMock(...args),
}));

declare global {
    var fetch: typeof globalThis.fetch;
}

beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_API_URL = "https://api.example.com";
});

describe("apiRequest", () => {
    it("performs a GET request and returns parsed JSON on success", async () => {
        const mockData = [{ id: 1, name: "Meal A" }];

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockData,
        } as any);

        const result = await apiRequest<typeof mockData>("/Food", "GET");

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/Food",
            { method: "GET" }
        );

        expect(result).toEqual(mockData);
        expect(toastMock).not.toHaveBeenCalled();
    });

    it("throws and shows toast when response.ok is false", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async () => ({}),
        } as any);

        await expect(apiRequest("/Food", "GET")).rejects.toThrow("Unexpected error! Please try again.");
        expect(toastMock).toHaveBeenCalledWith("Unexpected error! Please try again.");
    });

    it("throws and shows toast when fetch itself rejects", async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error("Network down"));

        await expect(apiRequest("/Food", "GET")).rejects.toThrow("Network down");
        expect(toastMock).toHaveBeenCalledWith("Network down");
    });
});