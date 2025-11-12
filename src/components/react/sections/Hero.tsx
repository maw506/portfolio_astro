import { useEffect, useRef } from "react";
import IconLink from "../ui/IconLink";
import "../../../styles/components/_hero.scss";
const cvUrl = "../assets/cv.pdf";
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sidesRef = useRef<HTMLDivElement>(null);
  const devRef = useRef<HTMLDivElement>(null);
  const designerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const devOverlayRef = useRef<HTMLDivElement>(null);
  const designerOverlayRef = useRef<HTMLDivElement>(null);
  const hiddenStateRef = useRef({ dev: false, designer: false });
  const animationRef = useRef({
    frame: 0,
    current: 0.5,
    target: 0.5,
    rectLeft: 0,
    rectWidth: 1,
    reducedMotion: false
  });
  useEffect(() => {
    const container = containerRef.current;
    const sides = sidesRef.current;
    const dev = devRef.current;
    const designer = designerRef.current;
    const avatar = avatarRef.current;
    if (!container || !sides || !dev || !designer || !avatar) {
      return;
    }
    const devOverlay = devOverlayRef.current;
    const designerOverlay = designerOverlayRef.current;
    const hiddenState = hiddenStateRef.current;
    const animationState = animationRef.current;
    const apply = (value: number) => {
      const clamped = clamp(value);
      animationState.current = clamped;
      const devFlex = clamped;
      const designerFlex = 1 - clamped;
      dev.style.setProperty("--flex-grow", devFlex.toString());
      designer.style.setProperty("--flex-grow", designerFlex.toString());
      sides.style.setProperty("--pointer-bias", clamped.toString());
      const distanceFromCenter = Math.abs(0.5 - clamped);
      const opacity = clamp(1 - distanceFromCenter * 1.8, 0.2, 1);
      const horizontalShift = (clamped - 0.5) * 80;
      avatar.style.opacity = opacity.toString();
      avatar.style.transform = `translate3d(-50%, -50%, 0) translate3d(${horizontalShift.toFixed(3)}px, 0, 0)`;
      if (devOverlay) {
        const devOpacity = clamp(1 - (0.5 - clamped) * 2.2, 0, 1);
        devOverlay.style.opacity = devOpacity.toString();
        devOverlay.style.transform = `translate3d(0, ${((0.5 - clamped) * 24).toFixed(3)}px, 0)`;
      }
      if (designerOverlay) {
        const designerOpacity = clamp(1 - (clamped - 0.5) * 2.2, 0, 1);
        designerOverlay.style.opacity = designerOpacity.toString();
        designerOverlay.style.transform = `translate3d(0, ${((clamped - 0.5) * 24).toFixed(3)}px, 0)`;
      }
      const hideThreshold = 0.22;
      const devHidden = devFlex < hideThreshold;
      if (devHidden !== hiddenState.dev) {
        hiddenState.dev = devHidden;
        dev.setAttribute("data-hidden", devHidden ? "true" : "false");
      }
      const designerHidden = designerFlex < hideThreshold;
      if (designerHidden !== hiddenState.designer) {
        hiddenState.designer = designerHidden;
        designer.setAttribute("data-hidden", designerHidden ? "true" : "false");
      }
    };
    const step = () => {
      animationState.frame = 0;
      const { current, target, reducedMotion } = animationState;
      const next = reducedMotion
        ? target
        : current + (target - current) * 0.12;
      apply(Math.abs(next - target) < 0.001 ? target : next);
      animationState.current = Math.abs(next - target) < 0.001 ? target : next;
      if (Math.abs(animationState.current - animationState.target) > 0.0005 && !animationState.reducedMotion) {
        animationState.frame = requestAnimationFrame(step);
      }
    };
    const updateTarget = (value: number) => {
      animationState.target = clamp(value);
      if (animationState.reducedMotion) {
        apply(animationState.target);
        return;
      }
      if (!animationState.frame) {
        animationState.frame = requestAnimationFrame(step);
      }
    };
    const updateRect = () => {
      const rect = container.getBoundingClientRect();
      animationState.rectLeft = rect.left;
      animationState.rectWidth = rect.width || 1;
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (animationState.reducedMotion) {
        return;
      }
      const relative = (event.clientX - animationState.rectLeft) / animationState.rectWidth;
      updateTarget(relative);
    };
    const handlePointerEnter = (event: PointerEvent) => {
      updateRect();
      handlePointerMove(event);
    };
    const handlePointerLeave = () => {
      updateTarget(0.5);
    };
    const handleResize = () => {
      updateRect();
    };
    const setReducedMotion = (matches: boolean) => {
      animationState.reducedMotion = matches;
      if (matches) {
        if (animationState.frame) {
          cancelAnimationFrame(animationState.frame);
          animationState.frame = 0;
        }
        animationState.target = 0.5;
        apply(0.5);
      }
    };
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };
    if ("addEventListener" in media) {
      media.addEventListener("change", handleMediaChange);
    } else {
      media.addListener(handleMediaChange);
    }
    updateRect();
    apply(animationState.current);
    container.addEventListener("pointerenter", handlePointerEnter, { passive: true });
    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      if (animationState.frame) {
        cancelAnimationFrame(animationState.frame);
        animationState.frame = 0;
      }
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      if ("removeEventListener" in media) {
        media.removeEventListener("change", handleMediaChange);
      } else {
        media.removeListener(handleMediaChange);
      }
    };
  }, []);
  return (
    <section className="hero">
      <div className="hero__split" ref={containerRef}>
        <div className="hero__content" ref={sidesRef}>
          <div className="hero__side hero__side--dev" ref={devRef} data-hidden="false">
            <div className="hero__overlay" ref={devOverlayRef}>
              <h2>Fullstack Web Developer</h2>
              <p>Con más de 3 años de experiencia creando aplicaciones web modernas, escalables y de alto rendimiento.</p>
            </div>
          </div>
          <div className="hero__side hero__side--designer" ref={designerRef} data-hidden="false">
            <div className="hero__overlay" ref={designerOverlayRef}>
              <h2>UI/UX Designer</h2>
              <p>En formación constante. Experiencia aplicando mis diseños directamente al desarrollo real.</p>
            </div>
          </div>
        </div>
        <div className="hero__avatar" ref={avatarRef}>
          <img src="/assets/avatar.jpg" alt="Avatar de Mauro" />
        </div>
        <div className="hero__actions">
          <IconLink href={cvUrl} icon="Download" />
          <IconLink href="https://github.com/maw506" icon="github" />
          <IconLink href="https://www.linkedin.com/in/gigenamauroexequiel/" icon="linkedin" />
          <IconLink href="https://instagram.com/maw.en.sistemas" icon="instagram" />
        </div>
      </div>
      <div className="hero__fallback">
        <img src="/assets/avatar.jpg" className="hero__fallback-avatar" alt="Avatar de Mauro" />
        <div className="hero__fallback-labels">
          <h1>Hi, I'm Mauro</h1>
          <span className="hero__label">Developer</span>
          <span className="hero__divider">|</span>
          <span className="hero__label">UI/UX Designer</span>
          <div className="hero__fallback-actions">
            <IconLink href={cvUrl} icon="Download" />
            <IconLink href="https://github.com/maw506" icon="github" />
            <IconLink href="https://www.linkedin.com/in/gigenamauroexequiel/" icon="linkedin" />
            <IconLink href="https://instagram.com/maw.en.sistemas" icon="instagram" />
          </div>
        </div>
      </div>
    </section>
  );
}
