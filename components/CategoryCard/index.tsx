"use client";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { CategoryType, UserContextType } from "@/types/types";
import { useUserContext } from "@/contexts/userContext";

const CategoryCard = ({
  idCategory,
  strCategory,
  strCategoryThumb,
}: CategoryType) => {
  const { user } = useUserContext() as UserContextType;

  const isFavourite = strCategory === user?.favoriteCategory;

  return (
    <Link href={`/categories/${strCategory}`}>
      <div
        className={`rounded-xl border bg-white p-3 shadow-sm ${
          isFavourite ? "border-green-700" : "border-gray-200"
        }`}
      >
        <img
          src={strCategoryThumb}
          alt={strCategory}
          className="aspect-square w-full rounded-lg object-cover"
        />

        <div className="mt-3 flex items-center justify-between">
          <h2 className="font-semibold">{strCategory}</h2>

          {isFavourite && (
            <FaHeart
              size={20}
              className="fill-red-500 text-red-500"
              aria-label="Favourite category"
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
