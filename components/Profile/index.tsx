"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import {
  CategoryType,
  RecipeType,
  UserContextType,
  UserType,
} from "@/types/types";
import MealCard from "@/components/MealCard";

const Profile = () => {
  const { user, setUser } = useUserContext() as UserContextType;

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [savedMeals, setSavedMeals] = useState<RecipeType[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories.php`,
      );

      const data = await response.json();

      setCategories(data.categories || []);
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getSavedMeals = async () => {
      if (!user || user.savedRecipes.length === 0) {
        setSavedMeals([]);
        return;
      }

      const meals = await Promise.all(
        user.savedRecipes.map(async (id) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}lookup.php?i=${id}`,
          );

          const data = await response.json();

          return data.meals?.[0];
        }),
      );

      setSavedMeals(meals.filter(Boolean));
    };

    getSavedMeals();
  }, [user]);

  if (!user) return null;

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const updatedUser: UserType = {
      ...user,
      favoriteCategory: event.target.value,
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
      <h1 className="text-3xl font-bold">Profile</h1>

      <p className="mt-2 text-gray-500">
        Manage your account and favourite meals.
      </p>

      <section className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Account information</h2>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>

            <input
              type="text"
              value={user.username}
              disabled
              className="mt-2 w-full rounded-lg border bg-gray-100 px-4 py-2 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>

            <input
              type="password"
              value={user.password}
              disabled
              className="mt-2 w-full rounded-lg border bg-gray-100 px-4 py-2 text-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Country
            </label>

            <input
              type="text"
              value={user.country}
              disabled
              className="mt-2 w-full rounded-lg border bg-gray-100 px-4 py-2 text-gray-600"
            />
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Favourite category</h2>

        <p className="mt-2 text-sm text-gray-500">
          Choose your favourite recipe category.
        </p>

        <div className="mt-4 max-w-sm">
          <select
            value={user.favoriteCategory}
            onChange={handleCategoryChange}
            className="w-full rounded-lg border bg-white px-4 py-2"
          >
            {categories.map((category) => (
              <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Saved meals</h2>

        <p className="mt-2 text-sm text-gray-500">
          You can save up to 3 meals.
        </p>

        {savedMeals.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {savedMeals.map((meal) => (
              <MealCard key={meal.idMeal} {...meal} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-gray-500">
            You haven't saved any meals yet.
          </p>
        )}
      </section>
    </main>
  );
};

export default Profile;
