"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { useUserContext } from "@/contexts/userContext";
import { RecipeType, UserContextType, UserType } from "@/types/types";

const MealCard = ({ idMeal, strMeal, strMealThumb }: RecipeType) => {
  const { user, setUser } = useUserContext() as UserContextType;

  const isSaved = user?.savedRecipes.includes(idMeal);

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    if (!isSaved && user.savedRecipes.length >= 3) {
      alert("You can save up to 3 meals.");
      return;
    }

    const updatedSavedRecipes = isSaved
      ? user.savedRecipes.filter((id) => id !== idMeal)
      : [...user.savedRecipes, idMeal];

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
    <div className="w-full">
      <div className="relative">
        <Link href={`/recipes/${idMeal}`}>
          <img
            src={strMealThumb}
            alt={strMeal}
            className="h-36 w-full rounded-lg object-cover"
          />
        </Link>

        <button
          type="button"
          onClick={handleSave}
          className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-sm"
          aria-label={isSaved ? "Remove from saved meals" : "Save meal"}
        >
          <FaHeart
            size={20}
            className={isSaved ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </button>
      </div>

      <Link href={`/recipes/${idMeal}`}>
        <h3 className="mt-3 text-base font-semibold leading-5">{strMeal}</h3>
      </Link>
    </div>
  );
};

export default MealCard;
