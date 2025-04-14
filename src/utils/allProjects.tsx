export interface Project {
  title: string;
  category: string;
  description: string;
  highlight?: boolean;
  stack?: string[];
  image?: string;
  rol?: string;
  utilidad?: string;
  tecnologiasClaves?: string[];
  usoInterno?: boolean;
}

export const allProjects: Project[] = [
  {
    title: "Quick 8D",
    category: "Destacados",
    description: "Gestión de reclamos de calidad con acciones correctivas.",
    highlight: true,
    stack: ["React", "Node.js", "Ant Design"],
    // image: "/images/projects/quick8d.jpg",
    rol: "Frontend Dev + Arquitectura del flujo",
    utilidad:
      "Seguimiento de calidad y acciones correctivas para problemas de producción.",
    tecnologiasClaves: ["Redux", "Ant Design", "PDF export"],
    usoInterno: true,
  },
  {
    title: "Rendiciones de Gasto",
    category: "Destacados",
    highlight: true,
    description: "Aprobación y control de gastos internos.",
  },
  {
    title: "Digital Twin",
    category: "Destacados",
    highlight: true,
    description: "Indicadores clave de planta en tiempo real.",
  },
  {
    title: "MagCut",
    category: "Destacados",
    highlight: true,
    description: "Sistema de corte con reportes y seguimiento.",
  },
  {
    title: "Pases de salida",
    category: "Gestión Interna",
    description: "Control de permisos y autorizaciones del personal.",
  },
  {
    title: "Control de Ausentismo",
    category: "Gestión Interna",
    description: "Visualización de asistencia por sector.",
  },
  {
    title: "Solicitud de Cheques",
    category: "Gestión Interna",
    description: "Flujo de solicitud y aprobación de pagos.",
  },
  {
    title: "Horas Extra",
    category: "Gestión Interna",
    description: "Gestión de horas extraordinarias.",
  },
  {
    title: "MagSew",
    category: "Producción",
    description: "Seguimiento de costura con reportes.",
  },
  {
    title: "MagFoam",
    category: "Producción",
    description: "Monitoreo en tiempo real de espuma.",
  },
  {
    title: "MagStamp",
    category: "Producción",
    description: "Estampado con indicadores de eficiencia.",
  },
  {
    title: "PMO MagProd",
    category: "Producción",
    description: "Plataforma unificada de producción.",
  },
  {
    title: "Indicadores OEE",
    category: "Dashboards",
    description: "Monitoreo de eficiencia por línea.",
  },
  {
    title: "Layout Planta",
    category: "Dashboards",
    description: "Visualización de estaciones y flujos.",
  },
  {
    title: "Visores de Producción",
    category: "Dashboards",
    description: "Paneles con métricas de planta.",
  },
];
