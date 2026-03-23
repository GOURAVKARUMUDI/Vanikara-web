import { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Enables the brand hover lift effect. Default: true. */
  hover?: boolean;
  style?: CSSProperties;
}

/**
 * Card: Standardized surface for content blocks with optional hover interactions.
 */
export default function Card({ children, className = '', hover = true, style }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-100 ${hover ? 'card-hover' : ''} ${className}`}
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,.06)', ...style }}
    >
      {children}
    </div>
  );
}

/**
 * CardBody: Inner padding container for Card content.
 */
export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-7 ${className}`}>{children}</div>;
}
