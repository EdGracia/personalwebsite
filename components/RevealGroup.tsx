"use client";

import { useEffect, useRef, useState, Children } from "react";

export default function RevealGroup({
  children,
  className = "",
  stagger = 60,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          style={
            visible
              ? {
                  opacity: 0,
                  animation: `reveal 0.6s ease-out ${i * stagger}ms forwards`,
                }
              : { opacity: 0 }
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
