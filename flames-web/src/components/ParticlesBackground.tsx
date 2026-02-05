"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface ParticlesBackgroundProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
  onParticleHit?: () => void;
  interactive?: boolean;
}

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");
  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  onParticleHit,
  interactive = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const mouseMoveRef = useRef(false);
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const requestRef = useRef<number>(0);

  // Helper refs to avoid re-triggering effects when props change but logic doesn't need to
  const paramsRef = useRef({ staticity, ease, vx, vy, color, quantity });
  
  useEffect(() => {
    paramsRef.current = { staticity, ease, vx, vy, color, quantity };
  }, [staticity, ease, vx, vy, color, quantity]);

  const circleParams = useCallback(() => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  }, []);

  const drawCircle = useCallback((circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      const rgb = hexToRgb(paramsRef.current.color);
      
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  }, [dpr]);

  const clearContext = useCallback(() => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  }, []);

  const drawParticles = useCallback(() => {
    clearContext();
    const particleCount = paramsRef.current.quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  }, [clearContext, circleParams, drawCircle]);

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  }, [dpr]);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    drawParticles();
  }, [resizeCanvas, drawParticles]);

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = useCallback(() => {
    clearContext();
    const { staticity, ease, vx, vy } = paramsRef.current;
    
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mousePosition.current.x / (staticity / circle.magnetism) -
          circle.translateX) /
        ease;
      circle.translateY +=
        (mousePosition.current.y / (staticity / circle.magnetism) -
          circle.translateY) /
        ease;

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      } else {
        drawCircle(
          {
            ...circle,
            x: circle.x,
            y: circle.y,
            translateX: circle.translateX,
            translateY: circle.translateY,
            alpha: circle.alpha,
          },
          true
        );
      }
    });
    requestRef.current = window.requestAnimationFrame(animateRef.current);
  }, [circleParams, clearContext, drawCircle]);

  // Store animate in a ref so it can reference itself
  const animateRef = useRef(animate);
  useEffect(() => {
    // Mutating refs is the correct pattern in React
    // eslint-disable-next-line react-hooks/exhaustive-deps
    animateRef.current = animate;
  }, [animate]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
        // Accessing refs in callbacks is valid and doesn't violate immutability
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            mousePosition.current = {
                x: e.clientX - rect.left - canvasSize.current.w / 2,
                y: e.clientY - rect.top - canvasSize.current.h / 2,
            };
            mouseMoveRef.current = true;
        }
  }, []);

  const handlePointerDown = useCallback((clientX: number, clientY: number) => {
    if (!canvasRef.current || !interactive || !onParticleHit) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Check if any circle was hit
    let hit = false;
    circles.current = circles.current.filter((circle) => {
      const dx = circle.x - x;
      const dy = circle.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Threshold for "hit" - 30px is generous for mobile
      if (distance < 30) {
        hit = true;
        return false; // Remove this particle
      }
      return true;
    });

    if (hit) {
      onParticleHit();
      // Draw a replacement particle immediately
      drawParticles();
    }
  }, [interactive, onParticleHit, drawParticles]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    handlePointerDown(e.clientX, e.clientY);
  }, [handlePointerDown]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
  }, [handlePointerDown]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    
    if (interactive) {
      canvasRef.current?.addEventListener("mousedown", handleMouseDown);
      canvasRef.current?.addEventListener("touchstart", handleTouchStart);
    }

    return () => {
      window.removeEventListener("resize", initCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (interactive) {
        canvasRef.current?.removeEventListener("mousedown", handleMouseDown);
        canvasRef.current?.removeEventListener("touchstart", handleTouchStart);
      }
      window.cancelAnimationFrame(requestRef.current);
    };
  }, [initCanvas, animate, handleMouseMove, handleMouseDown, handleTouchStart, interactive]);

  useEffect(() => {
    initCanvas();
  }, [refresh, initCanvas]);

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default ParticlesBackground;
