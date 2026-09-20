"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaYoutube } from "react-icons/fa";
import { useUserContext } from "@/contexts/userContext";
import { UserContextType, UserType } from "@/types/types";

type RecipeDetailsProps = {
  id: string;
};

type MealDetails = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: string | null;
  strYoutube: string | null;
  ingredients: string[];
};

const RecipeDetails = ({ id }: RecipeDetailsProps) => {
  const { user, setUser } = useUserContext() as UserContextType;

  const [recipe, setRecipe] = useState<MealDetails | null>(null);

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}lookup.php?i=${id}`,
      );

      const data = await response.json();

      if (!data.meals) return;

      const meal = data.meals[0];

      const ingredients: string[] = [];

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
          ingredients.push(
            `${measure ? measure.trim() : ""} ${ingredient.trim()}`,
          );
        }
      }

      setRecipe({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strInstructions: meal.strInstructions,
        strTags: meal.strTags,
        strYoutube: meal.strYoutube,
        ingredients,
      });
    };

    getRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-gray-500">Loading recipe...</p>
      </main>
    );
  }

  const isSaved = user?.savedRecipes.includes(recipe.idMeal);

  const handleSave = () => {
    if (!user) return;

    if (!isSaved && user.savedRecipes.length >= 3) {
      alert("You can save up to 3 meals.");
      return;
    }

    const updatedSavedRecipes = isSaved
      ? user.savedRecipes.filter((mealId) => mealId !== recipe.idMeal)
      : [...user.savedRecipes, recipe.idMeal];

    const updatedUser = {
      ...user,
      savedRecipes: updatedSavedRecipes,
    };

    setUser(updatedUser);

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const updatedUsers = users.map((item: UserType) => {
      if (item.username === user.username) {
        return updatedUser;
      }

      return item;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href={`/categories/${recipe.strCategory}`}
        className="text-sm font-semibold text-green-700"
      >
        ← Back to {recipe.strCategory}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full rounded-xl object-cover"
          />
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-bold">{recipe.strMeal}</h1>

            <button
              type="button"
              onClick={handleSave}
              className="rounded-full border bg-white p-3 shadow-sm"
              aria-label={isSaved ? "Remove from saved recipes" : "Save recipe"}
            >
              <FaHeart
                size={24}
                className={
                  isSaved ? "fill-red-500 text-red-500" : "text-gray-600"
                }
              />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              {recipe.strCategory}
            </span>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-bold">Ingredients</h2>

            <ul className="mt-4 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="border-b pb-2 text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Instructions</h2>

        <p className="mt-4 max-w-4xl whitespace-pre-line leading-7 text-gray-700">
          {recipe.strInstructions}
        </p>
      </section>

      {recipe.strTags && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Tags</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {recipe.strTags.split(",").map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </section>
      )}

      {recipe.strYoutube && (
        <section className="mt-8">
          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-red-600 hover:text-red-700"
          >
            <FaYoutube size={22} />
            Watch on YouTube
          </a>
        </section>
      )}
    </main>
  );
};

export default RecipeDetails;
