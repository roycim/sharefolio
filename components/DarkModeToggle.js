"use client";

import { useContext, useId } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function DarkModeToggle() {
  const id = useId();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        <Switch
          id={id}
          checked={isDarkMode}
          onCheckedChange={toggleTheme}
          className="peer absolute inset-0 h-full w-auto data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300"
        />
        <span className="pointer-events-none relative ml-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=checked]:text-muted-foreground/70">
          <Moon size={16} strokeWidth={2} aria-hidden="true" />
        </span>
        <span className="pointer-events-none relative mr-0.5 flex min-w-8 items-center justify-center text-center peer-data-[state=unchecked]:text-muted-foreground/70">
          <Sun size={16} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      {/* The label is visually hidden */}
      <label htmlFor={id} className="sr-only">
        Toggle Dark Mode
      </label>
    </div>
  );
}
