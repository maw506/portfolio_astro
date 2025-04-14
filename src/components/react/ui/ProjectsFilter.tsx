// react/sections/ProjectsFilter.tsx
import { useState, createContext, useContext } from "react";

export const FilterContext = createContext({
  filter: "Todos",
  setFilter: (_: string) => {},
});

export default function ProjectsFilter() {
  const { filter, setFilter } = useContext(FilterContext);
  const categories = [
    "Todos",
    "Destacados",
    "Gestión Interna",
    "Producción",
    "Dashboards",
  ];

  return (
    <div className="filters">
      {categories.map((cat) => (
        <a href="#projects">
          <button
            key={cat}
            className={`filterBtn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        </a>
      ))}
    </div>
  );
}
