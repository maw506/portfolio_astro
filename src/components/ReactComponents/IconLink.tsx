import { Github, Linkedin, Instagram, Download } from "lucide-react";
import { Tooltip } from "antd";

interface Props {
  href: string;
  icon: "github" | "linkedin" | "instagram" | "Download";
  label?: string;
}

const icons = {
  github: <Github />,
  linkedin: <Linkedin />,
  instagram: <Instagram />,
  Download: <Download />,
};

export default function IconLink({ href, icon, label }: Props) {
  return (
    <>
      <Tooltip
        placement="bottom"
        title={label || icon.charAt(0).toUpperCase() + icon.slice(1)}
      >
        <a
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-anchor-placement="top-bottom"
          href={href}
          className="icon-btn"
          aria-label={label || icon}
          target="_blank"
          rel="noopener noreferrer"
        >
          {icons[icon]}
        </a>
      </Tooltip>
    </>
  );
}
