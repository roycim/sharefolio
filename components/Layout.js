// components/Layout.js
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ThemeContext } from "../context/ThemeContext";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      {/* If home page, no container; otherwise, center content */}
      <main
        className={
          isHomePage
            ? "flex-1"
            : "flex-1 container mx-auto max-w-[1920px] px-6 pt-32 pb-24 space-y-6"
        }
      >
        {children}
      </main>
    </div>
  );
}
