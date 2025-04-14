import { useEffect, useState } from "react";
import "../../../styles/particles/_particlesGalaxy.scss";

type Particle = {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  type: "planet" | "star";
};

type Props = {
  count?: number;
  planetPosition?: {
    top: string;
    left: string;
    size?: string;
    display?: boolean; // default true
  };
};

export default function ParticlesGalaxy({ count = 15, planetPosition }: Props) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const total = typeof count === "number" && count > 0 ? count : 15;

    const generated: Particle[] = Array.from({ length: total }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      type: Math.random() > 0.5 ? "planet" : "star",
    }));

    setParticles(generated);
  }, [count]);

  return (
    <div className="galaxy-wrapper">
      {particles.map(({ id, top, left, size, delay, duration, type }) => (
        <div
          key={id}
          className={`galaxy-particle ${type}`}
          style={{
            top,
            left,
            width: size,
            height: size,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      ))}

      {planetPosition?.display  && (
        <div
          className="galaxy-planet"
          style={{
            top: planetPosition.top,
            left: planetPosition.left,
            width: planetPosition.size || "80px",
            height: planetPosition.size || "80px",
          }}
        />
      )}
    </div>
  );
}
