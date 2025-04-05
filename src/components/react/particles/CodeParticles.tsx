import { useEffect, useState } from "react";

const CODE_SNIPPETS = [
  "{}",
  "</>",
  "() => {}",
  "const",
  "let",
  "type",
  "return",
  "async",
  "<> </>",
  "React",
  "Vue",
  "nodeJs",
  "TypeScript",
  "JavaScript",
  "SQL server",
  "Sass",
  "html",
  "css",
  "010111",
];

type Particle = {
  id: number;
  text: string;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
};

export default function CodeParticles({ count = 12 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 18 + 12,
      delay: Math.random() * 6,
      duration: Math.random() * 6 + 6,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="code-particles-wrapper">
      {particles.map(({ id, text, top, left, size, delay, duration }) => (
        <span
          key={id}
          className="code-particle"
          style={{
            top,
            left,
            fontSize: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
