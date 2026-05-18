import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const getStoredTheme = () => {
  if (typeof document === "undefined") {
    return "dark";
  }
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }
  const domTheme = document.documentElement.getAttribute("data-theme");
  return domTheme === "light" || domTheme === "dark" ? domTheme : "dark";
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(getStoredTheme());
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const preferred =
      saved === "light" || saved === "dark"
        ? saved
        : document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark";
    setTheme(preferred);
    document.documentElement.setAttribute("data-theme", preferred);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300); // Duración igual al CSS
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        className="theme-button"
        aria-label="Cambiar tema"
      >
        <span className={`icon-wrapper ${animating ? "animate" : ""}`}>
          {theme === "dark" ? (
            <Sun size={18} stroke="currentColor" />
          ) : (
            <Moon size={18} stroke="currentColor" />
          )}
        </span>
      </button>
    </>
  );
}
