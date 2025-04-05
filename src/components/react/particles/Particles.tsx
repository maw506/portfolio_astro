import { useEffect, useState } from "react";
import "../../../styles/components/_particles.scss";

type Particle = {
  id: number;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
};

type Props = {
  count?: number;
};

export default function Particles({ count = 10 }: Props) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 4, // tamaño entre 4px y 12px
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 3, // entre 3s y 8s
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div className="particles-wrapper">
      {particles.map(({ id, top, left, size, delay, duration }) => (
        <div
          key={id}
          className="particle"
          style={{
            top,
            left,
            width: size,
            height: size,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            <path d="M12 2L13.09 8.26L19 9.27L14.5 13.14L15.82 19.02L12 16L8.18 19.02L9.5 13.14L5 9.27L10.91 8.26L12 2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
