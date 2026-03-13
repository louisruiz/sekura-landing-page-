"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MagneticCard = ({ 
  children, 
  className = "",
  spotlightColor = "rgba(0, 229, 160, 0.12)",
  tiltScale = 6, // Adjusts how extreme the 3D tilt is
  ...props
}: React.ComponentProps<typeof motion.div> & { 
  children: React.ReactNode; 
  className?: string;
  spotlightColor?: string;
  tiltScale?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltScale, -tiltScale]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltScale, tiltScale]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;

    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    mouseX.set(mX);
    mouseY.set(mY);
    
    if (props.onMouseMove) props.onMouseMove(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (props.onMouseEnter) props.onMouseEnter(e);
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    if (props.onMouseLeave) props.onMouseLeave(e);
  };

  const spotlightBackground = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 40%)`;
  const borderHighlight = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.3), transparent 40%)`;

  return (
    <motion.div
      {...props}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...props.style
      }}
      className={cn("group relative rounded-[24px] border border-white/5 bg-[#0A0C14]/60 backdrop-blur-2xl overflow-hidden shadow-2xl transition-colors duration-500 ease-out hover:border-white/10", className)}
    >
      {/* Spotlight Effect Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: spotlightBackground,
        }}
      />
      
      {/* Interactive Border Highlight Trick */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          maskImage: borderHighlight,
          WebkitMaskImage: borderHighlight,
          maskComposite: "exclude",
          pointerEvents: "none",
          border: '1px solid rgba(0, 229, 160, 0.5)',
          borderRadius: '24px'
        }}
      />

      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
};
