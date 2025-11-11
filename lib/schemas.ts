import * as z from "zod";

export const searchSchema = z.object({
    mealName: z.string(),
    delivery: z.boolean(),
    pickup: z.boolean()
});

export type SearchSchema = z.infer<typeof searchSchema>;

export const foodSchema = z.object({
    name: z.string().nonempty("Food name is required"),
    rating: z.string(),
    avatar: z.string().nonempty("Food image url is required"),
    restaurant_name: z.string().nonempty("Restaurant name is required"),
    logo: z.string().nonempty("Restaurant logo link is required"),
    open: z.enum(["open", "close"])
});

export type FoodSchema = z.infer<typeof foodSchema>;