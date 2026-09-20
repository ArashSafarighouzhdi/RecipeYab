"use client";

import Header from "@/components/Header";
import RecipeDetails from "@/components/RecipeDetails";

type RecipePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const RecipePage = async ({ params }: RecipePageProps) => {
  const { id } = await params;

  return (
    <>
      <Header />
      <RecipeDetails id={id} />
    </>
  );
};

export default RecipePage;
