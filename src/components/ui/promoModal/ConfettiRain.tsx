"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  yOffset: number;
  size: number;
  colorClass: string;
  delay: number;
  duration: number;
  rotationZ: number;
  rotationX: number;
  rotationY: number;
  shape: "square" | "circle" | "rectangle";
}

export const ConfettiRain = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "bg-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.5)]",
      "bg-[#ffffff] shadow-[0_0_8px_rgba(255,255,255,0.5)]",
      "bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.5)]",
      "bg-[#60a5fa] shadow-[0_0_8px_rgba(96,165,250,0.5)]",
      "bg-[#f472b6] shadow-[0_0_8px_rgba(244,114,182,0.5)]",
      "bg-[#c084fc] shadow-[0_0_8px_rgba(192,132,252,0.5)]",
      "bg-[#f87171] shadow-[0_0_8px_rgba(248,113,113,0.5)]",
      "bg-[#fb923c] shadow-[0_0_8px_rgba(251,146,60,0.5)]",
    ];

    const shapes: ("square" | "circle" | "rectangle")[] = ["square", "circle", "rectangle"];

    const generateParticles = (): Particle[] => {
      return Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 120 - 10,
        yOffset: Math.random() * 20 - 10,
        size: Math.random() * 5 + 4,
        colorClass: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 10,
        rotationZ: Math.random() * 360,
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      }));
    };

    const timeoutId = setTimeout(() => {
      setParticles(generateParticles());
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-250 overflow-hidden">
      {particles.map((p) => {
        let width = p.size;
        let height = p.size;
        let borderRadius = "2px";

        if (p.shape === "circle") {
          borderRadius = "50%";
        } else if (p.shape === "rectangle") {
          width = p.size * 1.5;
          height = p.size * 0.8;
        }

        return (
          <motion.div
            key={p.id}
            initial={{
              x: `${p.x}vw`,
              y: `${-10 + p.yOffset}vh`,
              rotateX: 0,
              rotateY: 0,
              rotateZ: p.rotationZ,
              opacity: 0,
            }}
            animate={{
              y: "110vh",
              rotateX: p.rotationX + 720,
              rotateY: p.rotationY + 720,
              rotateZ: p.rotationZ + 360,
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "linear",
              repeat: Infinity,
            }}
            className={`absolute ${p.colorClass}`}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              borderRadius: borderRadius,
            }}
          />
        );
      })}
    </div>
  );
};
