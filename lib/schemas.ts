import * as z from "zod";

export const searchSchema = z.object({
    mealName: z.string(),
    delivery: z.boolean(),
    pickup: z.boolean()
});

export type SearchSchema = z.infer<typeof searchSchema>;