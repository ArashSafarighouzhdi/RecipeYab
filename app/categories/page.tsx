"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import { useUserContext } from "@/contexts/userContext";
import { CategoryType, UserContextType } from "@/types/types";

const CategoriesPage = () => {
  const { user } = useUserContext() as UserContextType;
  const [categories, setCategories] = useState<CategoryType[]>([]);

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

  if (!user) return null;

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Categories</h1>

          <p className="mt-2 text-gray-500">Explore recipes by category.</p>

          <p className="mt-4 text-base">
            Your favourite category:{" "}
            <span className="font-semibold text-green-700">
              {user.favoriteCategory}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.idCategory} {...category} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CategoriesPage;
