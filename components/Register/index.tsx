"use client";

import { UserType } from "@/types/types";
import { useEffect, useState } from "react";
import Link from "next/link";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [favoriteCategory, setFavoriteCategory] = useState("");

  const [countries, setCountries] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      const countryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}list.php?a=list`,
      );

      const countryData = await countryResponse.json();

      const categoryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}list.php?c=list`,
      );

      const categoryData = await categoryResponse.json();

      setCountries(
        Array.from(
          new Set(
            countryData.meals.map((item: { strArea: string }) => item.strArea),
          ),
        ),
      );

      setCategories(
        Array.from(
          new Set(
            categoryData.meals.map(
              (item: { strCategory: string }) => item.strCategory,
            ),
          ),
        ),
      );
    };

    getData();
  }, []);

  const handleRegisterClick = () => {
    const newUser: UserType = {
      username,
      password,
      country,
      favoriteCategory,
      savedRecipes: [],
    };

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully! Please log in to continue.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center  px-4 py-10">
      <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Create Your Account</h1>

          <p className="mt-2 text-sm text-gray-500">
            Join RecipeYab and start exploring!
          </p>
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="username" className="text-sm font-semibold">
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            className="w-full rounded-md border px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full rounded-md border px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="country" className="text-sm font-semibold">
            Which country's cuisine do you like?
          </label>

          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-md border bg-white px-3 py-2 text-sm"
          >
            <option value="">Select a cuisine</option>

            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}

            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <label htmlFor="favoriteCategory" className="text-sm font-semibold">
            Favorite category
          </label>

          <select
            id="favoriteCategory"
            value={favoriteCategory}
            onChange={(e) => setFavoriteCategory(e.target.value)}
            className="w-full rounded-md border bg-white px-3 py-2 text-sm"
          >
            <option value="">Select a category</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleRegisterClick}
          className="w-full rounded-md bg-green-800 px-4 py-2 text-sm font-semibold text-white"
        >
          Create Account
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-green-800">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
