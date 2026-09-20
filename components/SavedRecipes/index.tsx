"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import { RecipeType, UserContextType } from "@/types/types";
import MealCard from "@/components/MealCard";

const SavedRecipes = () => {
  const { user } = useUserContext() as UserContextType;

  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    const getSavedRecipes = async () => {
      if (!user || user.savedRecipes.length === 0) {
        setRecipes([]);
        return;
      }

      const savedRecipes = await Promise.all(
        user.savedRecipes.slice(0, 3).map(async (id) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}lookup.php?i=${id}`,
          );

          const data = await response.json();

          return data.meals?.[0];
        }),
      );

      setRecipes(savedRecipes.filter(Boolean));
    };

    getSavedRecipes();
  }, [user]);

  if (!user) return null;

  const hasRecipes = recipes.length > 0;

  return (
    <section className="flex min-h-90 flex-col rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">Your saved recipes</h2>

      <p className="mt-2 text-base font-semibold text-green-700">
        You can save up to 3 meals.
      </p>

      <p className="mt-2 min-h-10 text-sm text-gray-500">
        Your personal collection of favourite meals.
      </p>

      {hasRecipes ? (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {recipes.map((recipe) => (
            <MealCard key={recipe.idMeal} {...recipe} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-gray-500">
            You haven't saved any recipes yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default SavedRecipes;
