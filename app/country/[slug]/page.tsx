import Link from "next/link";
import Header from "@/components/Header";
import MealCard from "@/components/MealCard";
import { RecipeType } from "@/types/types";

type CountryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const CountryPage = async ({ params }: CountryPageProps) => {
  const { slug } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}filter.php?a=${slug}`,
  );

  const data = await response.json();

  const meals: RecipeType[] = data.meals || [];

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <Link href="/" className="text-sm font-semibold text-green-700">
          ← Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-bold">{slug} Cuisine</h1>

        <p className="mt-2 text-gray-500">Explore meals from {slug} cuisine.</p>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} {...meal} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CountryPage;
