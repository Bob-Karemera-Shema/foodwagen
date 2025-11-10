import { toast } from "sonner";
import { ApiMethod, RequestBody } from "./types";

export const apiRequest = async <T>(
    endpoint: string,
    method: ApiMethod,
    data?: RequestBody
): Promise<T> => {
    try {
        const url = process.env.NEXT_PUBLIC_API_URL + endpoint;
        const options = method === "POST" ? {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        } : {
            method
        };

        const response = await fetch(url, options);
        if(!response.ok) throw new Error("Unexpected error! Please try again.");

        return await response.json();
    } catch(err) {
        const message = err instanceof Error ? err.message : "Unexpected error! Please try again.";
        toast(message);
        throw err;
    }
}