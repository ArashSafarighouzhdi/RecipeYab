"use client";

import Link from "next/link";
import Header from "@/components/Header";
import CountryRecipes from "@/components/CountryRecipes";
import FavoriteCategoryRecipes from "@/components/FavoriteCategoryRecipes";
import SavedRecipes from "@/components/SavedRecipes";
import { useUserContext } from "@/contexts/userContext";
import { UserContextType } from "@/types/types";

export default function Home() {
  const { user } = useUserContext() as UserContextType;

  if (!user) {
    return (
      <main className=" px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-155 grid-cols-1 md:grid-cols-[32%_68%]">
            <div
              className="min-h-75 bg-cover bg-center md:min-h-155"
              style={{
                backgroundImage: "url('/home-image.avif')",
              }}
            />

            <div className="flex flex-col">
              <header className="flex items-center justify-between px-8 py-6 md:px-10">
                <Link href="/" className="text-xl font-bold ">
                  <h2 className="text-xl font-bold">
                    Recipe<span className="text-green-800">Yab</span>
                  </h2>
                </Link>

                <nav className="flex items-center gap-5 text-sm">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link
                      href="/login"
                      className="rounded-md border border-green-800 px-4 py-2 font-medium text-green-800"
                    >
                      Log In
                    </Link>

                    <Link
                      href="/register"
                      className="rounded-md bg-green-800 px-4 py-2 font-medium text-white"
                    >
                      Sign Up
                    </Link>
                  </div>
                </nav>
              </header>

              <div className="flex flex-1 items-center px-8 py-10 md:px-14">
                <div>
                  <h1 className="max-w-lg text-5xl font-bold leading-tight md:text-6xl">
                    Good Food
                    <br />
                    Brings People
                    <br />
                    Together
                  </h1>

                  <p className="mt-6 max-w-md text-sm leading-6 text-gray-600 md:text-base">
                    Discover delicious recipes from around the world. Find your
                    next favorite meal!
                  </p>

                  <Link
                    href="/register"
                    className="mt-8 inline-block rounded-md bg-green-800 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              <div className="px-8 pb-8 text-right md:px-12">
                <p className="text-lg italic text-amber-700">
                  Cook.
                  <br />
                  Explore.
                  <br />
                  Enjoy. ❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Good to see you, {user.username}! 👋
            </h1>

            <p className="mt-2 text-gray-600">
              Here are some recipes just for you.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          <CountryRecipes />
          <FavoriteCategoryRecipes />
          <SavedRecipes />
        </div>
      </main>
    </>
  );
}
