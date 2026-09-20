"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserContext } from "@/contexts/userContext";
import { UserContextType, UserType } from "@/types/types";

const LogIn = () => {
  const { setUser } = useUserContext() as UserContextType;
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    const users: UserType[] = JSON.parse(localStorage.getItem("users") || "[]");

    const loggedInUser = users.find(
      (item) => item.username === username && item.password === password,
    );

    if (loggedInUser) {
      setUser(loggedInUser);
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-xl font-bold text-green-800">
          RecipeYab
        </Link>

        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="w-full max-w-sm rounded-xl border bg-white p-8 shadow-md">
            <h1 className="text-2xl font-bold">Welcome Back!</h1>

            <p className="mt-2 text-sm text-gray-500">
              Log in to continue your culinary journey.
            </p>

            <div className="my-6 border-t" />

            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="username" className="text-sm font-semibold">
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="mb-6 flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleLoginClick}
              className="w-full rounded-md bg-green-800 px-4 py-3 text-sm font-semibold text-white"
            >
              Log In
            </button>

            <p className="mt-5 text-center text-xs text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-green-800">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LogIn;
