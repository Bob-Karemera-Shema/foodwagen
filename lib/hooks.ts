"use client";

import useSWR from "swr";
import { apiRequest } from "./api";
import { Meal } from "./types";

const fetcher = (url: string) => apiRequest<Meal[]>(url, "GET");

export function useMeals(searchQuery?: string) {
  const key = searchQuery ? `/Food?name-[${searchQuery}]` : "/Food";

  const { data, error, isLoading, mutate } = useSWR(key, fetcher);

  return {
    meals: data || [],
    isLoading,
    error: error ? (error as Error).message : null,
    reload: () => mutate(),
  };
}