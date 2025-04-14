import { useState } from "react";
import ProjectsFilter, { FilterContext } from "../ui/ProjectsFilter";
import ProjectsGrid from "../ui/ProjectsGrid";

export default function ProjectsGallery() {
  const [filter, setFilter] = useState("Todos");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <ProjectsFilter />
      <ProjectsGrid />
    </FilterContext.Provider>
  );
}
