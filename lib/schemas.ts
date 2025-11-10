import * as z from "zod";

export const searchSchema = z.object({
    mealName: z.string().min(1, "Meal name is required"),
    delivery: z.boolean(),
    pickup: z.boolean()
});

export type SearchSchema = z.infer<typeof searchSchema>;