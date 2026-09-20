"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUserContext } from "@/contexts/userContext";
import { RecipeType, UserContextType } from "@/types/types";
import MealCard from "@/components/MealCard";

const CountryRecipes = () => {
  const { user } = useUserContext() as UserContextType;
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      if (!user || user.country === "Other") {
        setRecipes([]);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}filter.php?a=${user.country}`,
      );

      const data = await response.json();

      setRecipes(data.meals || []);
    };

    getRecipes();
  }, [user]);

  if (!user) return null;

  const hasRecipes = user.country !== "Other" && recipes.length > 0;

  return (
    <section className="flex min-h-90 flex-col rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">Recipes from your cuisine</h2>

      <p className="mt-2 text-base font-semibold text-green-700">
        {user.country}
      </p>

      {hasRecipes ? (
        <>
          <p className="mt-2 min-h-10 text-sm text-gray-500">
            Explore traditional and popular {user.country} recipes.
          </p>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {recipes.slice(0, 3).map((recipe) => (
              <MealCard key={recipe.idMeal} {...recipe} />
            ))}
          </div>

          <Link
            href={`/country/${user.country}`}
            className="mt-auto pt-6 text-left text-sm font-semibold text-green-700"
          >
            View more →
          </Link>
        </>
      ) : (
        <>
          <p className="mt-2 min-h-10 text-sm text-gray-500">
            We're sorry! We're currently collecting and updating recipes for
            this cuisine. Please check back soon.
          </p>
        </>
      )}
    </section>
  );
};

export default CountryRecipes;
