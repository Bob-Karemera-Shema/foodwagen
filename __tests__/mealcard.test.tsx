import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MealCard } from "@/app/components/meal-card";
import type { Meal } from "@/lib/types";

vi.mock("next/image", () => ({
    default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img {...props} />
    ),
}));

vi.mock("@/components/custom/custom-popover", () => ({
    CustomPopover: ({
        trigger,
        children,
    }: {
        trigger: React.ReactNode;
        children: React.ReactNode;
    }) => (
        <div data-testid="custom-popover">
            <div data-testid="popover-trigger">{trigger}</div>
            <div data-testid="popover-content">{children}</div>
        </div>
    ),
}));

vi.mock("./add-edit-dialog", () => ({
    AddEditDialog: ({
        trigger,
    }: {
        trigger: React.ReactNode;
    }) => <div data-testid="add-edit-dialog">{trigger}</div>,
}));

vi.mock("./delete-dialog", () => ({
    DeleteDialog: ({
        trigger,
    }: {
        trigger: React.ReactNode;
    }) => <div data-testid="delete-dialog">{trigger}</div>,
}));

const makeMeal = (overrides: Partial<Meal> = {}): Meal =>
({
    id: 1,
    name: "Spicy Pasta",
    Price: 10,
    rating: 4.5,
    open: true,
    avatar: "/food-placeholder.jpg",
    logo: "/restaurant-placeholder.jpg",
    ...overrides,
} as Meal);


describe("MealCard", () => {
    it("renders the meal name, price and rating", () => {
        const meal = makeMeal();

        render(<MealCard meal={meal} />);

        expect(screen.getByText(meal.name)).toBeInTheDocument();
        expect(screen.getByText(`$${meal.Price}`)).toBeInTheDocument();
        expect(screen.getByText(String(meal.rating))).toBeInTheDocument();
    });

    it("renders meal and restaurant images with correct alt text", () => {
        const meal = makeMeal();

        render(<MealCard meal={meal} />);

        expect(screen.getByAltText(`${meal.name} image`)).toBeInTheDocument();
        expect(screen.getByAltText("restaurant logo")).toBeInTheDocument();
    });

    it("shows 'Open' status when meal.open is true", () => {
        const meal = makeMeal({ open: true });

        render(<MealCard meal={meal} />);

        const status = screen.getByText("Open");
        expect(status).toBeInTheDocument();
    });

    it("shows 'Closed' status when meal.open is false", () => {
        const meal = makeMeal({ open: false });

        render(<MealCard meal={meal} />);

        const status = screen.getByText("Closed");
        expect(status).toBeInTheDocument();
    });

    it("renders Edit and Delete actions in the popover", () => {
        const meal = makeMeal();

        render(<MealCard meal={meal} />);

        expect(screen.getByRole("button", { name: /user options/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    });
});