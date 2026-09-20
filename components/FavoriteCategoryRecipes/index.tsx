"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import { RecipeType, UserContextType } from "@/types/types";
import MealCard from "@/components/MealCard";
import Link from "next/link";

const FavoriteCategoryRecipes = () => {
  const { user } = useUserContext() as UserContextType;
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      if (!user) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}filter.php?c=${user.favoriteCategory}`,
      );

      const data = await response.json();

      setRecipes(data.meals || []);
    };

    getRecipes();
  }, [user]);

  if (!user) return null;

  return (
    <section className="flex min-h-90 flex-col rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">Your favourite category</h2>

      <p className="mt-2 text-base font-semibold text-green-700">
        {user.favoriteCategory}
      </p>

      <p className="mt-2 min-h-10 text-sm text-gray-500">
        Recipes you might love.
      </p>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {recipes.slice(0, 3).map((recipe) => (
          <MealCard key={recipe.idMeal} {...recipe} />
        ))}
      </div>

      <Link
        href={`/categories/${user.favoriteCategory}`}
        className="mt-auto pt-6 text-left text-sm font-semibold text-green-700"
      >
        View more →
      </Link>
    </section>
  );
};

export default FavoriteCategoryRecipes;
