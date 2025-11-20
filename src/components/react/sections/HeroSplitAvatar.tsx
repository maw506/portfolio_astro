import { useEffect, useRef } from "react";
import "../../../styles/components/_heroSplitAvatar.scss";
import IconLink from "../ui/IconLink";
const cvUrl = "../assets/cv.pdf";

export default function HeroSplitAvatar() {
  const devRef = useRef<HTMLDivElement>(null);
  const designerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const sidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const devEl = devRef.current;
    const designerEl = designerRef.current;
    const avatarEl = avatarRef.current;
    const sidesEl = sidesRef.current;

    if (!devEl || !designerEl || !avatarEl || !sidesEl) return;

    const bounds = { left: 0, width: 1 };
    const pointerX = { current: null as number | null };
    const frameRef = { current: null as number | null };
    const resetTimer = { current: null as number | null };
    const resetDuration = 400;

    const updateBounds = () => {
      const rect = sidesEl.getBoundingClientRect();
      bounds.left = rect.left;
      bounds.width = rect.width || 1;
    };

    const clearResetTimer = () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
        resetTimer.current = null;
      }
    };

    const resetSides = () => {
      pointerX.current = null;
      clearResetTimer();
      sidesEl.classList.add("is-resetting");
      avatarEl.classList.add("is-resetting");

      devEl.style.flexGrow = "1";
      designerEl.style.flexGrow = "1";
      avatarEl.style.opacity = "1";
      avatarEl.style.transform = "translate(-50%, -50%)";

      devEl.setAttribute("data-hidden", "false");
      designerEl.setAttribute("data-hidden", "false");

      resetTimer.current = window.setTimeout(() => {
        sidesEl.classList.remove("is-resetting");
        avatarEl.classList.remove("is-resetting");
      }, resetDuration);
    };

    const applyMovement = () => {
      frameRef.current = null;

      if (pointerX.current === null) return;

      const percent = Math.min(
        1,
        Math.max(0, (pointerX.current - bounds.left) / bounds.width)
      );

      const devFlex = percent;
      const designerFlex = 1 - percent;

      devEl.style.flexGrow = devFlex.toString();
      designerEl.style.flexGrow = designerFlex.toString();

      const distanceFromCenter = Math.abs(0.5 - percent);
      const opacityMultiplier = 4;
      const opacity = 1 - distanceFromCenter * opacityMultiplier;
      avatarEl.style.opacity = String(Math.max(0, Math.min(1, opacity)));

      const movement = (percent - 0.5) * 50;
      avatarEl.style.transform = `translate(-50%, -50%) translate3d(${movement}px, 0, 0)`;

      const hideThreshold = 0.25;
      devEl.setAttribute("data-hidden", devFlex < hideThreshold ? "true" : "false");
      designerEl.setAttribute(
        "data-hidden",
        designerFlex < hideThreshold ? "true" : "false"
      );
    };

    const queueMovement = (event: PointerEvent) => {
      pointerX.current = event.clientX;
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(applyMovement);
      }
    };

    updateBounds();

    devEl.style.willChange = "flex-grow";
    designerEl.style.willChange = "flex-grow";
    avatarEl.style.willChange = "transform, opacity";

    sidesEl.addEventListener("pointermove", queueMovement, { passive: true });
    sidesEl.addEventListener("pointerleave", resetSides, { passive: true });
    window.addEventListener("resize", updateBounds, { passive: true });
    window.addEventListener("scroll", updateBounds, { passive: true });

    return () => {
      sidesEl.removeEventListener("pointermove", queueMovement);
      sidesEl.removeEventListener("pointerleave", resetSides);
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      clearResetTimer();
    };
  }, []);

  return (
    <section className="hero-split">
      <div className="content">
        <div
          className="sides"
          ref={sidesRef}
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
