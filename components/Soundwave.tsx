import { useEffect, useRef } from "react";

interface SoundwaveProps {
  isActive: boolean;
}

export default function Soundwave({ isActive }: SoundwaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const waves = 3;

      for (let w = 0; w < waves; w++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(236, 72, 153, ${0.3 + w * 0.2})`;
        ctx.lineWidth = 2;

        for (let x = 0; x < canvas.width; x++) {
          const frequency = 0.02 + w * 0.005;
          const amplitude = isActive ? 30 + w * 15 : 10 + w * 5;
          const offset = (w * Math.PI) / 1.5;

          const y =
            centerY + Math.sin(x * frequency + phase + offset) * amplitude;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      if (isActive) {
        phase += 0.08;
      } else {
        phase += 0.02;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
