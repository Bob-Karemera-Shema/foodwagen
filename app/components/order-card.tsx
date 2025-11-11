"use client"

import { searchSchema, type SearchSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CustomCheckbox } from "@/components/custom/custom-checkbox";
import { FaMotorcycle, FaShoppingBag } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMemo } from "react";

type OrderCardProps = {
    onSearchAction: (query: string) => void;
};

// Search debouncing helper
function debounce<T extends (...args: Parameters<T>) => void>(
    fn: T,
    delay = 400
) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>): void => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

export const OrderCard = ({ onSearchAction }: OrderCardProps) => {
    const form = useForm<SearchSchema>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            mealName: "",
            delivery: true,
            pickup: false,
        }
    });

    const values = form.watch();

    // Debounced search trigger
    const debouncedSearch = useMemo(() => debounce(onSearchAction, 400), [onSearchAction]);

    const onSubmit = (data: SearchSchema) => {
        const query = data.mealName.trim();
        onSearchAction(query);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-2xl bg-background w-full shadow-md shadow-[#ffa300]">
                {/* Delivery options */}
                <div className="w-full p-6 flex items-center gap-2">
                    <CustomCheckbox
                        label="Delivery"
                        Icon={FaMotorcycle}
                        checked={values.delivery}
                        setCheckedAction={() => {
                            form.setValue("delivery", true);
                            form.setValue("pickup", false)
                        }}
                    />

                    <CustomCheckbox
                        label="Pickup"
                        Icon={FaShoppingBag}
                        checked={values.pickup}
                        setCheckedAction={() => {
                            form.setValue("delivery", false);
                            form.setValue("pickup", true)
                        }}
                    />
                </div>

                {/* Searchbar */}
                <div className="w-full p-6 flex sm:flex-row items-start gap-2.5">
                    <FormField
                        control={form.control}
                        name="mealName"
                        render={({ field }) => (
                            <FormItem className="grow">
                                <FormControl>
                                    <div className="relative top-[3px] flex items-center gap-1">
                                        <Search className="w-[18px] h-[18px] text-[#f17228]" />
                                        <Input
                                            className="border-none w-full grow"
                                            placeholder="What do you like to eat today?"
                                            aria-label="Meal search input"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                field.onChange(value);
                                                debouncedSearch(value);
                                            }}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="relative left-8" />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="bg-linear-to-r from-[#ff7a7a] to-[#f65900] rounded-[8px] py-[21px] px-12"
                    >
                        <Search className="font-black text-sm w-3.5 h-3.5" />
                        <span className="font-bold text-lg">Find Meal</span>
                    </Button>
                </div>
            </form>
        </Form>
    );
}