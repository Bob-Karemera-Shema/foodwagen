"use client"

import { useMeals } from "@/lib/hooks";
import { Hero } from "./components/hero";
import { Loader, ChevronRight } from "lucide-react";
import { MealCard } from "./components/meal-card";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";

const INITIAL_VISIBLE = 8;
const LOAD_MORE_STEP = 8;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const { meals, isLoading, error } = useMeals(
    searchQuery.trim() ? searchQuery.trim() : undefined
  );

  const visibleMeals = useMemo(
    () => meals.slice(0, visibleCount),
    [meals, visibleCount]
  );

  const hasMore = visibleCount < meals.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_STEP);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(INITIAL_VISIBLE); // reset pagination on new search
  };

  return (
    <main className="space-y-20">
      <Hero onSearch={handleSearch} />

      {/* Featured Meals section */}
      <section className="space-y-22">
        <h4 className="font-bold text-2xl sm:text-3xl lg:text-[43px] text-center">
          {searchQuery.trim() ? `Search Results for "${searchQuery.trim()}"` : "Featured Meals"}
        </h4>

        {
          isLoading === true && (
            <article className="h-full flex items-center justify-center gap-1 text-muted-foreground">
              <Loader className="animate-spin" />
              <span>Loading...</span>
            </article>
          )
        }

        {
          error && (
            <article className="h-full flex items-center justify-center gap-1 text-muted-foreground">
              {error}
            </article>
          )
        }

        {
          !isLoading && !error && meals.length === 0 && (
            <article className="h-full flex items-center justify-center text-muted-foreground">
              No meals found.
            </article>
          )
        }

        {
          visibleMeals.length > 0 && (
            <>
              <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-4 px-4 sm:px-8 lg:px-30">
                {
                  visibleMeals.map(meal => <MealCard key={meal.id} meal={meal} />)
                }
              </article>

              {
                hasMore && (
                  <Button
                    type="button"
                    onClick={handleLoadMore}
                    className="bg-linear-to-r from-[#ffba26] to-[#ff9a0e] shadow-md shadow-[##FFAE004A] rounded-[14px] py-[21px] px-12 mx-auto flex items-center gap-2.5"
                  >
                    <span className="font-bold text-lg">Load more </span>
                    <ChevronRight className="font-black text-sm w-[9px] h-3.5" />
                  </Button>
                )
              }
            </>
          )
        }
      </section>
    </main>
  );
}
