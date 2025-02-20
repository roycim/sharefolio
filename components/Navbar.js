"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import { ThemeContext } from "../context/ThemeContext";

// OriginUI components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

// Lucide icons
import {
  CircleUserRound,
  LogOut,
  UserPen,
  Bolt,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Explore", href: "/explore" },
    { label: "Draft", href: "/draft" },
  ];

  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!error) setUser(user);
    }
    fetchUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  }

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 h-24 px-12 backdrop-blur-md border-b
        ${isDarkMode ? "bg-card/80 border-border" : "bg-popover/80 border-border"}
        flex items-center justify-between
      `}
    >
      {/* LEFT: Navigation Links */}
      <div className="flex items-center">
        <div className="hidden md:flex space-x-16 pl-12">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link key={item.label} href={item.href} className="group relative">
                <span
  className={`
    text-[22px] font-medium transition-colors duration-300 cursor-pointer
    ${
      isActive
        ? isDarkMode
          ? "font-bold text-white"
          : "font-bold text-black"
        : "text-foreground/80 dark:text-white/80"
    }
    ${isDarkMode ? "hover:text-white" : "hover:text-black"} 
  `}
>
  {item.label}
</span>

                {/* Underline Animation */}
                <span
                  className={`
                    absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 scale-x-0
                    group-hover:scale-x-100 transition-transform duration-300 origin-left
                  `}
                />
              </Link>
            );
          })}
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Button variant="outline" className="p-2 hover:bg-muted/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-foreground dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* CENTER: Responsive Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
        <div className="hidden sm:block">
          <Image
            src={isDarkMode ? "/sharefolio-logo-dark.png" : "/sharefolio-logo-light.png"}
            alt="Sharefolio Logo"
            width={200}
            height={40}
            priority
          />
        </div>
        <div className="block sm:hidden">
          <Image
            src="/sharefolio-logo-small.png"
            alt="Sharefolio Small Logo"
            width={40}
            height={40}
            priority
          />
        </div>
      </div>

      {/* RIGHT: Profile Dropdown + Theme Dropdown */}
      <div className="flex items-center space-x-4 pr-12">
        {user ? (
          <UserDropdown user={user} onLogout={handleLogout} isDarkMode={isDarkMode} />
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              asChild
              variant="outline"
              className="px-4 py-2 text-xl hover:bg-muted/40 transition-colors"
            >
              <Link href="/auth">Sign In</Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="px-4 py-2 text-xl hover:bg-muted/40 transition-colors"
            >
              <Link href="/auth">Sign Up</Link>
            </Button>
          </div>
        )}
        <ThemeDropdown isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </nav>
  );
}

/* Profile Dropdown Component */
function UserDropdown({ user, onLogout, isDarkMode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Profile menu" className="hover:bg-muted/40 transition-colors">
          <CircleUserRound size={20} strokeWidth={2} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className={`min-w-[220px] p-3 border border-border rounded-md shadow-md 
                    ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <DropdownMenuLabel className="flex flex-col items-center gap-1 py-3 px-4">
          <img src="/avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full" />
          <span className="text-sm font-semibold">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 border-border" />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            className={`py-3 px-4 text-sm rounded-md transition-colors 
                        ${isDarkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"}`}
          >
            <Bolt size={16} strokeWidth={2} className="opacity-60 mr-2" aria-hidden="true" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`py-3 px-4 text-sm rounded-md transition-colors 
                        ${isDarkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"}`}
          >
            <UserPen size={16} strokeWidth={2} className="opacity-60 mr-2" aria-hidden="true" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2 border-border" />
        <DropdownMenuItem 
          onClick={onLogout} 
          className={`py-3 px-4 text-sm rounded-md transition-colors 
                      ${isDarkMode ? "text-red-400 hover:bg-gray-700" : "text-red-600 hover:bg-gray-200"}`}
        >
          <LogOut size={16} strokeWidth={2} className="opacity-60 mr-2" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* Theme Dropdown Component */
function ThemeDropdown({ isDarkMode, toggleTheme }) {
  const handleSetTheme = (value) => {
    if (value === "dark" && !isDarkMode) {
      toggleTheme();
    } else if (value === "light" && isDarkMode) {
      toggleTheme();
    }
    // "system" is a no-op for now
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Select theme" className="hover:bg-muted transition-colors">
          {isDarkMode ? (
            <Moon size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Sun size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className={`min-w-[220px] p-3 border border-border rounded-md shadow-md 
                    ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <DropdownMenuItem 
          onClick={() => handleSetTheme("light")} 
          className={`py-3 px-4 text-sm rounded-md transition-colors 
                      ${isDarkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"}`}
        >
          <Sun size={16} strokeWidth={2} className="opacity-60 mr-2" aria-hidden="true" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleSetTheme("dark")} 
          className={`py-3 px-4 text-sm rounded-md transition-colors 
                      ${isDarkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"}`}
        >
          <Moon size={16} strokeWidth={2} className="opacity-60 mr-2" aria-hidden="true" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleSetTheme("system")} 
          className={`py-3 px-4 text-sm rounded-md transition-colors 
                      ${isDarkMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-200"}`}
        >
          <Monitor size={16} strokeWidth={2} className="opacity-60 mr-2" aria-hidden="true" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
