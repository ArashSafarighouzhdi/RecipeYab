"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import MealCard from "@/components/MealCard";
import { RecipeType } from "@/types/types";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const CategoryPage = ({ params }: CategoryPageProps) => {
  const [category, setCategory] = useState("");
  const [meals, setMeals] = useState<RecipeType[]>([]);

  useEffect(() => {
    const getMeals = async () => {
      const { slug } = await params;

      setCategory(slug);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}filter.php?c=${slug}`,
      );

      const data = await response.json();

      setMeals(data.meals || []);
    };

    getMeals();
  }, [params]);

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Link
          href="/categories"
          className="text-sm font-semibold text-green-700"
        >
          ← Back to categories
        </Link>

        <h1 className="mt-6 text-3xl font-bold">{category} Meals</h1>

        <p className="mt-2 text-gray-500">Explore meals from this category.</p>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} {...meal} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CategoryPage;
