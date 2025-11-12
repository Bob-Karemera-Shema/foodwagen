import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { AddEditForm } from "@/app/components/add-edit-form";
import type { Meal } from "@/lib/types";

vi.mock("@/components/custom/custom-input", () => ({
    CustomInput: ({
        ariaLabel,
        ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
        ariaLabel?: string;
    }) => <input aria-label={ariaLabel} {...props} />,
}));

vi.mock("@/components/ui/button", () => ({
    Button: ({
        children,
        ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button {...props}>{children}</button>
    ),
}));

vi.mock("@/components/ui/dialog", () => ({
    DialogClose: ({ asChild, children }: any) => (asChild ? children : <div>{children}</div>),
}));

vi.mock("@/components/ui/select", () => {
    const Select = ({
        value,
        onValueChange
    }: {
        value?: string;
        onValueChange: (value: string) => void;
    }) => (
        <select
            data-testid="open-select"
            value={value ?? ""}
            onChange={(e) => onValueChange(e.target.value)}
        >
            <option value="">Select status</option>
            <option value="open">Open</option>
            <option value="close">Close</option>
        </select>
    );

    const PassThrough = ({
        children,
    }: {
        children: React.ReactNode;
    }) => <>{children}</>;

    return {
        Select,
        SelectTrigger: PassThrough,
        SelectContent: PassThrough,
        SelectItem: PassThrough,
        SelectValue: PassThrough,
    };
});

const reloadMock = vi.fn();
vi.mock("@/lib/hooks", () => ({
    useMeals: () => ({
        reload: reloadMock,
    }),
}));

const apiRequestMock = vi.fn();
vi.mock("@/lib/api", () => ({
    apiRequest: (...args: any[]) => apiRequestMock(...args),
}));

const toastMock = vi.fn();
vi.mock("sonner", () => ({
    toast: (...args: any[]) => toastMock(...args),
}));

const makeMeal = (overrides: Partial<Meal> = {}): Meal =>
({
    id: 123,
    name: "Burger",
    rating: 4.2,
    avatar: "https://example.com/burger.png",
    restaurant_name: "Good Food",
    logo: "https://example.com/logo.png",
    open: true,
    ...overrides,
} as Meal);

beforeEach(() => {
    vi.clearAllMocks();
});

describe("AddEditForm (Add a meal)", () => {
    it("allows user to type in all text inputs", async () => {
        const user = userEvent.setup();
        render(<AddEditForm />);

        const nameInput = screen.getByLabelText("name");
        const ratingInput = screen.getByLabelText("rating");
        const avatarInput = screen.getByLabelText("avatar");
        const restaurantNameInput = screen.getByLabelText("restaurant_name");
        const logoInput = screen.getByLabelText("logo");

        await user.type(nameInput, "Spicy Pasta");
        await user.type(ratingInput, "4.5");
        await user.type(avatarInput, "https://example.com/pasta.png");
        await user.type(restaurantNameInput, "Pasta House");
        await user.type(logoInput, "https://example.com/logo.png");

        expect(nameInput).toHaveValue("Spicy Pasta");
        expect(ratingInput).toHaveValue(4.5);
        expect(avatarInput).toHaveValue("https://example.com/pasta.png");
        expect(restaurantNameInput).toHaveValue("Pasta House");
        expect(logoInput).toHaveValue("https://example.com/logo.png");
    });

    it("lets the user choose open/close from the select", async () => {
        const user = userEvent.setup();
        render(<AddEditForm />);

        const select = screen.getByTestId("open-select") as HTMLSelectElement;

        // initial empty value
        expect(select.value).toBe("");

        await user.selectOptions(select, "open");
        expect(select.value).toBe("open");

        await user.selectOptions(select, "close");
        expect(select.value).toBe("close");
    });

    it("shows 'Add' label on submit button in create mode", () => {
        render(<AddEditForm />);
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
    });
});

describe("AddEditForm (Edit a meal)", () => {
    it("pre-fills the form with meal data", () => {
        const meal = makeMeal({
            name: "Fried Rice",
            rating: 3.9,
            avatar: "https://example.com/rice.png",
            restaurant_name: "Rice Place",
            logo: "https://example.com/rice-logo.png",
            open: false,
        });

        render(<AddEditForm meal={meal} />);

        expect(screen.getByLabelText("name")).toHaveValue("Fried Rice");
        expect(screen.getByLabelText("rating")).toHaveValue(3.9);
        expect(screen.getByLabelText("avatar")).toHaveValue(
            "https://example.com/rice.png",
        );
        expect(screen.getByLabelText("restaurant_name")).toHaveValue(
            "Rice Place",
        );
        expect(screen.getByLabelText("logo")).toHaveValue(
            "https://example.com/rice-logo.png",
        );

        const select = screen.getByTestId("open-select") as HTMLSelectElement;
        expect(select.value).toBe("close");
    });

    it("submits updated meal via PUT and shows 'Food successfully updated'", async () => {
        const user = userEvent.setup();
        const meal = makeMeal({ open: false });

        apiRequestMock.mockResolvedValueOnce(meal);

        render(<AddEditForm meal={meal} />);

        // Change name and rating to simulate user editing
        await user.clear(screen.getByLabelText("name"));
        await user.type(screen.getByLabelText("name"), "Updated Name");

        await user.clear(screen.getByLabelText("rating"));
        await user.type(screen.getByLabelText("rating"), "5");

        const select = screen.getByTestId("open-select") as HTMLSelectElement;
        await user.selectOptions(select, "open");

        const submitButton = screen.getByRole("button", { name: "Save" });
        await user.click(submitButton);

        await waitFor(() => {
            expect(apiRequestMock).toHaveBeenCalledTimes(1);
        });

        const [url, method, body] = apiRequestMock.mock.calls[0];
        expect(url).toBe(`/Food/${meal.id}`);
        expect(method).toBe("PUT");
        expect(body).toEqual(
            expect.objectContaining({
                name: "Updated Name",
                rating: 5,
                open: true,
            }),
        );

        expect(toastMock).toHaveBeenCalledWith("Food successfully updated");
        expect(reloadMock).toHaveBeenCalled();
    });

    it("shows 'Save' label on submit button in edit mode", () => {
        const meal = makeMeal();
        render(<AddEditForm meal={meal} />);
        expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });
});
