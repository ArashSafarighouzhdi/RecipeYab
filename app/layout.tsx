import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/contexts/userContext";
import LogInWrapper from "@/components/LogIn/wrapper";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RecipeYab",
  description: "Find your favorite recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="flex min-h-screen flex-col bg-cover bg-center bg-fixed">
            <div className="flex-1">
              <LogInWrapper>{children}</LogInWrapper>
            </div>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
