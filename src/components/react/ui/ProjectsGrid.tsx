// react/sections/ProjectsGrid.tsx
import { useContext, useState } from "react";
import { FilterContext } from "./ProjectsFilter";
import ProjectModal from "./ProjectModal";
import { allProjects } from "../../../utils/allProjects";

export default function ProjectsGrid() {
  const { filter } = useContext(FilterContext);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    filter === "Todos"
      ? allProjects
      : allProjects.filter((p) => p.category === filter);

  return (
    <>
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className={`project-card ${project.highlight ? "highlight" : ""}`}
            onClick={() => setSelectedProject(project)}
          >
            <h4>{project.title}</h4>
            <p>{project.description}</p>
          </div>
        ))}
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  );
}
