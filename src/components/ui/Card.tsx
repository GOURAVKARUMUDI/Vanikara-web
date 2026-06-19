import { ReactNode, CSSProperties } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Enables the brand hover lift and glow effect. Default: true. */
  hover?: boolean;
  style?: CSSProperties;
}

/**
 * Card: Frosted Glassmorphism card surface that matches active atmosphere settings.
 */
export default function Card({ children, className = "", hover = true, style }: CardProps) {
  const hoverClass = hover ? "glass-card" : "liquid-glass rounded-2xl";
  
  return (
    <div
      className={`${hoverClass} p-0 overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/**
 * CardBody: Inner padding container for Card content.
 */
export function CardBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-6 sm:p-8 ${className}`}>{children}</div>;
}
