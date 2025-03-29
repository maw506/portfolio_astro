import { useRef } from "react";
import "../../styles/components/_heroSplitAvatar.scss";
import IconLink from "./IconLink";
const cvUrl = "../assets/cv.pdf";

export default function HeroSplitAvatar() {
  const devRef = useRef<HTMLDivElement>(null);
  const designerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const sidesRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;

    let percent = x / rect.width;
    percent = Math.min(1, Math.max(0, percent)); // clamp entre 0 y 1

    const devFlex = percent;
    const designerFlex = 1 - percent;

    if (devRef.current && designerRef.current && avatarRef.current) {
      devRef.current.style.flexGrow = devFlex.toString();
      designerRef.current.style.flexGrow = designerFlex.toString();

      const distanceFromCenter = Math.abs(0.5 - percent);

      const opacityMultiplier = 4;
      const opacity = 1 - distanceFromCenter * opacityMultiplier;
      avatarRef.current.style.opacity = String(
        Math.max(0, Math.min(1, opacity))
      );

      const movement = (percent - 0.5) * 50;
      avatarRef.current.style.transform = `translate(-50%, -50%) translateX(${movement}px)`;

      const hideThreshold = 0.25;
      devRef.current.setAttribute(
        "data-hidden",
        devFlex < hideThreshold ? "true" : "false"
      );
      designerRef.current.setAttribute(
        "data-hidden",
        designerFlex < hideThreshold ? "true" : "false"
      );
    }
  };

  const resetSides = () => {
    if (
      devRef.current &&
      designerRef.current &&
      avatarRef.current &&
      sidesRef.current
    ) {
      sidesRef.current.classList.add("is-resetting");
      avatarRef.current.classList.add("is-resetting");

      devRef.current.style.flexGrow = "1";
      designerRef.current.style.flexGrow = "1";
      avatarRef.current.style.opacity = "1";
      avatarRef.current.style.transform = "translate(-50%, -50%)";

      devRef.current.setAttribute("data-hidden", "false");
      designerRef.current.setAttribute("data-hidden", "false");

      setTimeout(() => {
        sidesRef.current?.classList.remove("is-resetting");
        avatarRef.current?.classList.remove("is-resetting");
      }, 400);
    }
  };

  return (
    <section className="hero-split">
      <div className="content">
        <div
          className="sides"
          ref={sidesRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetSides}
        >
          <div
            className="side side--dev"
            ref={devRef}
            data-hidden="false"
            style={{ flexGrow: 1 }}
          >
            <div className="overlay">
              <h2>Fullstack Web Developer</h2>
              <p>
                Con más de 3 años de experiencia creando aplicaciones web
                modernas, escalables y de alto rendimiento.
              </p>
            </div>
          </div>
          <div
            className="side side--designer"
            ref={designerRef}
            data-hidden="false"
            style={{ flexGrow: 1 }}
          >
            <div className="overlay">
              <h2>UI/UX Designer</h2>
              <p>
                En formación constante. Experiencia aplicando mis diseños
                directamente al desarrollo real.
              </p>
            </div>
          </div>
        </div>

        <div className="avatar-wrapper" ref={avatarRef}>
          <img src="/assets/avatar.jpg" alt="Avatar de Mauro" />
        </div>
      </div>

      <div className="hero-buttons">
        <IconLink href={cvUrl} icon="Download" />
        <IconLink href="https://github.com/maw506" icon="github" />
        <IconLink
          href="https://www.linkedin.com/in/gigenamauroexequiel/"
          icon="linkedin"
        />
        <IconLink
          href="https://instagram.com/maw.en.sistemas"
          icon="instagram"
        />
      </div>
    </section>
  );
}
