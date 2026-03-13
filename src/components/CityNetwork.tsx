"use client";

import { useEffect, useRef } from "react";

interface CityNetworkProps {
  id: string;
  className?: string;
}

const CITIES = [
  { name: "SÃO PAULO", x: 0.7, y: 0.65 },
  { name: "MEXICO CITY", x: 0.25, y: 0.4 },
  { name: "BOGOTÁ", x: 0.4, y: 0.5 },
  { name: "LIMA", x: 0.35, y: 0.6 },
  { name: "BUENOS AIRES", x: 0.55, y: 0.8 },
  { name: "SANTIAGO", x: 0.45, y: 0.75 },
  { name: "RIO DE JANEIRO", x: 0.8, y: 0.6 },
  { name: "CARACAS", x: 0.5, y: 0.45 },
  { name: "NEW YORK", x: 0.6, y: 0.2 },
  { name: "MIAMI", x: 0.5, y: 0.3 },
  { name: "LOS ANGELES", x: 0.15, y: 0.25 },
  { name: "MADRID", x: 0.9, y: 0.3 },
];

const COLORS = ['#00E5A0', '#3DD6F5', '#FF4D6A', '#FFD93D', '#8B5CF6'];

export default function CityNetwork({ id, className = '' }: CityNetworkProps) {
  const mouse = useRef({ x: -1, y: -1, isActive: false });

  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true
      };
    };

    const handleMouseLeave = () => {
      mouse.current.isActive = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Give each city a slight random drift
    const nodes = CITIES.map((city, i) => {
      const startX = city.x * (canvas.width || 800);
      const startY = city.y * (canvas.height || 600);
      return {
        ...city,
        color: COLORS[i % COLORS.length],
        baseVx: (Math.random() - 0.5) * 0.1,
        baseVy: (Math.random() - 0.5) * 0.1,
        vx: 0,
        vy: 0,
        currentX: startX,
        currentY: startY,
        targetX: startX,
        targetY: startY,
        pulse: Math.random() * Math.PI * 2,
        isHovered: false,
      };
    });

    let frame = 0;
    let animId: number;

    const draw = () => {
      if (!canvas.width || !canvas.height) {
        animId = requestAnimationFrame(draw);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Update positions & interactions
      nodes.forEach(n => {
        // Recalculate target to handle resize gracefully
        const cityAnchor = CITIES.find(c => c.name === n.name)!;
        n.targetX = cityAnchor.x * canvas.width;
        n.targetY = cityAnchor.y * canvas.height;

        // If it was stuck at 0,0 due to initial zero-size, snap it to target first time size is available
        if (n.currentX === 0 && n.currentY === 0 && (n.targetX !== 0 || n.targetY !== 0)) {
          n.currentX = n.targetX;
          n.currentY = n.targetY;
        }

        // Drift slowly around the target
        n.currentX += n.baseVx;
        n.currentY += n.baseVy;
        n.pulse += 0.05;

        // Keep them bounded near their anchor
        if (Math.abs(n.currentX - n.targetX) > 20) n.baseVx *= -1;
        if (Math.abs(n.currentY - n.targetY) > 20) n.baseVy *= -1;

        // Hover Check
        n.isHovered = false;
        if (mouse.current.isActive) {
          const dx = mouse.current.x - n.currentX;
          const dy = mouse.current.y - n.currentY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 40) { // Hover radius
            n.isHovered = true;
          }
        }
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];

          const dx = nodeA.currentX - nodeB.currentX;
          const dy = nodeA.currentY - nodeB.currentY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Draw standard faint lines if close enough, or strong lines if either is hovered
          const isActivelyConnected = nodeA.isHovered || nodeB.isHovered;
          
          if (dist < 300 || isActivelyConnected) {
            let lineAlpha = Math.max(0, (300 - dist) / 300) * 0.15; // Weak base line
            let lineWidth = 0.5;

            if (isActivelyConnected) {
              lineAlpha = 0.8; // Bright laser when hovered
              lineWidth = 2.0;
            }

            if (lineAlpha > 0) {
              ctx.beginPath();
              ctx.moveTo(nodeA.currentX, nodeA.currentY);
              ctx.lineTo(nodeB.currentX, nodeB.currentY);
              
              const gradient = ctx.createLinearGradient(nodeA.currentX, nodeA.currentY, nodeB.currentX, nodeB.currentY);
              gradient.addColorStop(0, `${nodeA.color}${Math.floor(lineAlpha * 255).toString(16).padStart(2, '0')}`);
              gradient.addColorStop(1, `${nodeB.color}${Math.floor(lineAlpha * 255).toString(16).padStart(2, '0')}`);
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = lineWidth;
              ctx.stroke();

              // Laser Light travel effect if hovered
              if (isActivelyConnected) {
                const speed = 0.03;
                // Determine direction based on who is hovered
                let t = (frame * speed) % 1;
                if (nodeB.isHovered) t = 1 - t; // Reverse direction

                const px = nodeA.currentX + (nodeB.currentX - nodeA.currentX) * t;
                const py = nodeA.currentY + (nodeB.currentY - nodeA.currentY) * t;
                
                const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, 15);
                pulseGrad.addColorStop(0, `${nodeA.isHovered ? nodeA.color : nodeB.color}CC`);
                pulseGrad.addColorStop(1, 'transparent');
                
                ctx.fillStyle = pulseGrad;
                ctx.beginPath();
                ctx.arc(px, py, 15, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      }

      // Draw nodes and Text
      nodes.forEach(n => {
        const scale = 1 + Math.sin(n.pulse) * 0.2;
        const size = n.isHovered ? 6 : 3;

        // Outer Glow
        const glow = ctx.createRadialGradient(n.currentX, n.currentY, 0, n.currentX, n.currentY, size * 5 * scale);
        glow.addColorStop(0, `${n.color}60`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.currentX, n.currentY, size * 5 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.currentX, n.currentY, size * scale, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(n.currentX, n.currentY, (size * scale) / 2, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Draw Text IF hovered
        if (n.isHovered) {
          ctx.font = 'bold 12px monospace';
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = n.color;
          ctx.shadowBlur = 10;
          ctx.fillText(n.name, n.currentX + 15, n.currentY + 4);
          ctx.shadowBlur = 0; // Reset
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [id]);

  return (
    <canvas
      id={id}
      className={`absolute inset-0 w-full h-full cursor-crosshair ${className}`}
    />
  );
}
