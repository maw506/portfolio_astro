import { memo, useEffect, useRef } from "react";
import "../../../styles/components/_heroSplitAvatar.scss";
import IconLink from "../ui/IconLink";
const cvUrl = "../assets/cv.pdf";

type DevParticlesProps = {
  parentRef: React.RefObject<HTMLDivElement>;
};

const DevParticles = memo(function DevParticles({ parentRef }: DevParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = parentRef.current;
    if (!canvas || !parent) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (prefersReduced || isMobile) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const characters = ["0", "1", "<", ">", "{", "}", "//", ";", "$", "_", "&", "|"];
    const particleCount = 36;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.2 + Math.random() * 0.4,
      drift: -0.05 + Math.random() * 0.1,
      char: characters[Math.floor(Math.random() * characters.length)],
      size: 14 + Math.random() * 8,
      alpha: 0.2 + Math.random() * 0.4,
    }));

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let animationFrame: number | null = null;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const handlePointer = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      pointer.targetX = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.targetY = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const draw = () => {
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.textBaseline = "middle";
      context.textAlign = "center";

      particles.forEach((particle) => {
        particle.y += particle.speed;
        particle.x += particle.drift * 0.002;

        if (particle.y > 1) particle.y = 0;
        if (particle.x > 1) particle.x = 0;
        if (particle.x < 0) particle.x = 1;

        const parallaxX = pointer.x * 18;
        const parallaxY = pointer.y * 10;

        const drawX = particle.x * canvas.width + parallaxX;
        const drawY = particle.y * canvas.height + parallaxY;

        context.globalAlpha = particle.alpha;
        context.font = `${particle.size}px 'Fira Code', 'SF Mono', monospace`;
        context.fillStyle = "#7dd3fc";
        context.fillText(particle.char, drawX, drawY);
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    parent.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      parent.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("resize", resize);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, [parentRef]);

  return <canvas ref={canvasRef} className="dev-particles" aria-hidden="true" />;
});

const DesignerDecorations = memo(function DesignerDecorations() {
  const elements = [
    { className: "paint paint--one" },
    { className: "paint paint--two" },
    { className: "paint paint--three" },
    { className: "shape shape--rect" },
    { className: "shape shape--circle" },
    { className: "shape shape--cursor" },
    { className: "shape shape--dropper" },
  ];

  return (
    <div className="designer-decor" aria-hidden="true">
      {elements.map((item, index) => (
        <span key={index} className={item.className} />
      ))}
    </div>
  );
});

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
      devEl.setAttribute("data-expanded", "false");
      designerEl.setAttribute("data-expanded", "false");

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
      const devHidden = devFlex < hideThreshold;
      const designerHidden = designerFlex < hideThreshold;
      devEl.setAttribute("data-hidden", devHidden ? "true" : "false");
      designerEl.setAttribute("data-hidden", designerHidden ? "true" : "false");

      const expansionThreshold = 0.55;
      const devExpansionThreshold = 0.45;
      const devExpanded = percent < devExpansionThreshold && !devHidden;
      const designerExpanded = percent > expansionThreshold && !designerHidden;
      devEl.setAttribute("data-expanded", devExpanded ? "true" : "false");
      designerEl.setAttribute("data-expanded", designerExpanded ? "true" : "false");
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
            data-expanded="false"
            style={{ flexGrow: 1 }}
          >
            <DevParticles parentRef={devRef} />
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
            data-expanded="false"
            style={{ flexGrow: 1 }}
          >
            <DesignerDecorations />
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
