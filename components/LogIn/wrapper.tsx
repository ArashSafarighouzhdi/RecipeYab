"use client";

import { usePathname } from "next/navigation";
import { useUserContext } from "@/contexts/userContext";
import { UserContextType } from "@/types/types";
import LogIn from "@/components/LogIn";

const LogInWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext() as UserContextType;
  const pathname = usePathname();

  const publicRoutes = ["/", "/login", "/register"];

  if (!user && !publicRoutes.includes(pathname)) {
    return <LogIn />;
  }

  return children;
};

export default LogInWrapper;
