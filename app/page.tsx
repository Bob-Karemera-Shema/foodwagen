"use client"

import { useMeals } from "@/lib/hooks";
import { Hero } from "./components/hero";
import { Loader, ChevronRight } from "lucide-react";
import { MealCard } from "./components/meal-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { meals, isLoading, error, reload } = useMeals();

  return (
    <main className="space-y-20">
      <Hero />

      {/* Featured Meals section */}
      <section className="space-y-22">
        <h4 className="font-bold text-[43px] text-center">
          Featured Meals
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
          meals && (
            <>
              <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-4 px-4 sm:px-8 lg:px-30">
                {
                  meals.map(meal => <MealCard key={meal.id} meal={meal} />)
                }
              </article>

              <Button className="bg-linear-to-r from-[#ffba26] to-[#ff9a0e] shadow-md shadow-[##FFAE004A] rounded-[14px] py-[21px] px-12 mx-auto flex items-center gap-2.5">
                <span className="font-bold text-lg">Load more </span>
                <ChevronRight className="font-black text-sm w-[9px] h-[14px]" />
              </Button>
            </>
          )
        }
      </section>
    </main>
  );
}
