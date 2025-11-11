"use client"

import { CustomInput } from "@/components/custom/custom-input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/api";
import { useMeals } from "@/lib/hooks";
import { foodSchema, type FoodSchema } from "@/lib/schemas";
import { Meal } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type CrudFormProps = {
    meal?: Meal;
    onSuccessAction?: () => void;
};

export const AddEditForm = ({ meal, onSuccessAction }: CrudFormProps) => {
    const { reload } = useMeals();
    const form = useForm<FoodSchema>({
        resolver: zodResolver(foodSchema),
        defaultValues: {
            name: meal?.name || meal?.food_name || "",
            rating: String(meal?.rating) || meal?.food_rating || undefined,
            avatar: meal?.avatar || meal?.food_image || "",
            restaurant_name: meal?.restaurant_name || meal?.restaurant?.name || "",
            logo: meal?.logo || meal?.restaurant_logo || "",
            open: meal ? (meal.open ? "open" : "close") : undefined
        }
    });

    const onSubmit = async (data: FoodSchema) => {
        try {
            console.log(data);
            const url = meal ? `/Food/${meal.id}` : "/Food";
            const method = meal ? "PUT" : "POST";
            
            await apiRequest<Meal>(url, method, {
                ...data,
                rating: Number(data.rating),
                open: data.open === "open" ? true : false
            });

            const message = meal ? "Food successfully updated" : "Food successfully added";
            toast(message);
            
            form.reset();
            reload();
            onSuccessAction?.();
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Unexpected error! Please try again.";
            toast(message);
        }
    };

    let buttonLabel;

    if (meal) {
        buttonLabel = form.formState.isSubmitting ? "Saving..." : "Save";
    } else {
        buttonLabel = form.formState.isSubmitting ? "Adding..." : "Add";
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <CustomInput
                            ariaLabel="name"
                            placeholder="Food name"
                            {...field}
                        />
                    )}
                />

                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <CustomInput
                            ariaLabel="rating"
                            placeholder="Food rating"
                            type="number"
                            min={0}
                            {...field}
                        />
                    )}
                />

                <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                        <CustomInput
                            ariaLabel="avatar"
                            placeholder="Food image (link)"
                            {...field}
                        />
                    )}
                />

                <FormField
                    control={form.control}
                    name="restaurant_name"
                    render={({ field }) => (
                        <CustomInput
                            ariaLabel="restaurant_name"
                            placeholder="Restaurant name"
                            {...field}
                        />
                    )}
                />

                <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <CustomInput
                            ariaLabel="logo"
                            placeholder="Restaurant logo (link)"
                            {...field}
                        />
                    )}
                />

                <FormField
                    control={form.control}
                    name="open"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value ?? ""}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Restaurant status (open/close)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="open">Open</SelectItem>
                                        <SelectItem value="close">Close</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    <Button
                        type="submit"
                        className="rounded-[14px] py-[21px] px-12 bg-linear-to-r from-[#ffb126] to-[#ff9a0e]"
                        disabled={form.formState.isSubmitting}
                    >
                        {buttonLabel}
                    </Button>
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="rounded-[14px] border border-[#ffba26] py-[21px] px-12"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                </div>
            </form>
        </Form>
    );
}