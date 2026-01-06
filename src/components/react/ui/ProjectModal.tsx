import React, { useId } from "react";
import { Tag } from "antd";
import { tagColors } from "../../../utils/tagColors";
import Modal from "./Modal";

interface Project {
  title: string;
  description: string;
  stack?: string[];
  image?: string;
  highlight?: boolean;
  rol?: string;
  utilidad?: string;
  tecnologiasClaves?: string[];
  usoInterno?: boolean;
}

const getTagColor = (tech: string) => tagColors[tech] || "default";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectModal({ isOpen, onClose, project }: Props) {
  const titleId = useId();
  const descriptionId = useId();

  if (!isOpen || !project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={descriptionId}
      contentClassName="project-modal"
    >
      <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">
        ✕
      </button>

      <h3 id={titleId}>{project.title}</h3>
      <p id={descriptionId}>{project.description}</p>

      <div className="modal-flex">
        {project.rol && (
          <div className="modal-section">
            <h4>Rol</h4>
            <p>{project.rol}</p>
          </div>
        )}
        {project.usoInterno !== undefined && (
          <div className="modal-section">
            <h4>Uso</h4>
            <p>{project.usoInterno ? "Interno" : "Externo o público"}</p>
          </div>
        )}
      </div>

      {project.utilidad && (
        <div className="modal-section">
          <h4>Utilidad</h4>
          <p>{project.utilidad}</p>
        </div>
      )}

      {project.stack && (
        <div className="modal-section">
          <h4>Stack utilizado</h4>
          <div className="tech-tags">
            {project.stack.map((tech, i) => (
              <Tag key={i} color={getTagColor(tech)}>
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {project.tecnologiasClaves && (
        <div className="modal-section">
          <h4>Tecnologías clave</h4>
          <div className="tech-tags">
            {project.tecnologiasClaves.map((tech, i) => (
              <Tag key={i} color={getTagColor(tech)}>
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {project.image && (
        <img src={project.image} alt={project.title} className="modal-img" />
      )}
    </Modal>
  );
}
