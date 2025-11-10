export interface Meal {
    createdAt: string;
    name: string;
    avatar: string;
    rating: number;
    open: boolean;
    logo: string;
    Price: string;
    id: string;
    restaurant_name?: string;
    restaurant_logo?: string;
    food_name?: string;
    food_rating?: string;
    food_image?: string;
    price?: string;
    restaurant_image?: string;
    restaurant_status?: string;
    status?: string;
    type?: string;
    restaurant?: {
        name: string;
        logo: string;
        status: string;
    }
};

export type RequestBody = Record<string, unknown>;

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";