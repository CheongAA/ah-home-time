"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

const INITIAL_POSITION = { x: 100, y: 20 };
export default function DraggableWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(INITIAL_POSITION); // right, bottom
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    // 현재 마우스 위치와 요소 위치의 차이 저장
    setOffset({
      x: e.clientX - rect.right,
      y: e.clientY - rect.bottom,
    });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newRight = window.innerWidth - moveEvent.clientX + offset.x;
      const newBottom = window.innerHeight - moveEvent.clientY + offset.y;
      setPosition({ x: newRight, y: newBottom });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    const handleResize = () => {
      setPosition(INITIAL_POSITION);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={wrapperRef}
      onMouseDown={onMouseDown}
      className="fixed z-50 cursor-move"
      style={{ right: position.x, bottom: position.y }}
    >
      {children}
    </div>
  );
}
