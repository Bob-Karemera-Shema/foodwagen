import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "@/app/page";


const mockUseMeals = vi.fn();

vi.mock("@/lib/hooks", () => ({
    useMeals: (...args: any[]) => mockUseMeals(...args),
}));


vi.mock("@/app/components/hero", () => ({
    Hero: ({ onSearch }: { onSearch: (query: string) => void }) => (
        <div data-testid="hero">
            <button onClick={() => onSearch("Pasta")}>Mock Search</button>
        </div>
    ),
}));

vi.mock("@/app/components/meal-card", () => ({
    MealCard: ({ meal }: { meal: any }) => (
        <div data-testid="meal-card">{meal.name}</div>
    ),
}));

vi.mock("@/components/ui/button", () => ({
    Button: ({
        children,
        ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button {...props}>{children}</button>
    ),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("Home page meal fetch behavior", () => {
    it("shows a loading state while meals are being fetched", () => {
        mockUseMeals.mockReturnValue({
            meals: [],
            isLoading: true,
            error: null,
            reload: vi.fn(),
        });

        render(<Home />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("shows an error message when fetching meals fails", () => {
        mockUseMeals.mockReturnValue({
            meals: [],
            isLoading: false,
            error: "Something went wrong",
            reload: vi.fn(),
        });

        render(<Home />);

        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("shows 'No meals found.' when there are no meals and no error", () => {
        mockUseMeals.mockReturnValue({
            meals: [],
            isLoading: false,
            error: null,
            reload: vi.fn(),
        });

        render(<Home />);

        expect(screen.getByText("No meals found.")).toBeInTheDocument();
    });

    it("renders meals when fetch succeeds", () => {
        const meals = [
            { id: 1, name: "Spicy Pasta" },
            { id: 2, name: "Cheesy Pizza" },
        ];

        mockUseMeals.mockReturnValue({
            meals,
            isLoading: false,
            error: null,
            reload: vi.fn(),
        });

        render(<Home />);

        expect(screen.getByText("Featured Meals")).toBeInTheDocument();

        const cards = screen.getAllByTestId("meal-card");
        expect(cards).toHaveLength(2);
        expect(screen.getByText("Spicy Pasta")).toBeInTheDocument();
        expect(screen.getByText("Cheesy Pizza")).toBeInTheDocument();
    });

    it("shows 'Load more' button when there are more meals than initial visible count", () => {
        // INITIAL_VISIBLE is 8, so we return 10 meals
        const meals = Array.from({ length: 10 }).map((_, i) => ({
            id: i + 1,
            name: `Meal ${i + 1}`,
        }));

        mockUseMeals.mockReturnValue({
            meals,
            isLoading: false,
            error: null,
            reload: vi.fn(),
        });

        render(<Home />);

        expect(screen.getByRole("button", { name: /Load more/i })).toBeInTheDocument();
    });
});