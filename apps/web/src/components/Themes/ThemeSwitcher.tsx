"use client";

import { Button } from "@repo/ui/button";
import { useTheme } from "./ThemeContext";

const ThemeSwitch = () => {
  const theme = useTheme(); // <- TODO: Get the theme from the context

  console.log(theme?.theme);
  return (
    <Button value={theme?.theme === "light" ? "Dark Mode" : "Light Mode"} onClick={theme?.toggleTheme}>{theme?.theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}</Button>
  );
};

export default ThemeSwitch;
