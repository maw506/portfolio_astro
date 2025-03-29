import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const preferred = saved || "light";
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
