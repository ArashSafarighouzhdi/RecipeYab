"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/contexts/userContext";
import { UserContextType } from "@/types/types";

const Header = () => {
  const { setUser } = useUserContext() as UserContextType;
  const router = useRouter();

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  return (
    <header className="border-b ">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 ">
        <Link href="/" className="text-2xl font-bold">
          <h2 className="text-xl font-bold">
            Recipe<span className="text-green-800">Yab</span>
          </h2>
        </Link>

        <nav className="flex flex-col items-end gap-3 text-sm font-medium sm:flex-row sm:items-center sm:gap-6">
          <Link href="/" className="hover:text-green-800">
            Home
          </Link>

          <Link href="/categories" className="hover:text-green-800">
            Categories
          </Link>

          <Link href="/profile" className="hover:text-green-800">
            Profile
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="text-red-700 hover:text-red-900"
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
