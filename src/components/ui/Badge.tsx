import { ReactNode } from 'react';

interface BadgeProps {
  /** Content to display inside the badge. */
  children: ReactNode;
  /** Color variant matching the brand palette. */
  variant?: 'blue' | 'orange' | 'gold' | 'slate';
  className?: string;
}

const VARIANTS = {
  blue:   { bg: '#e8f0fe', text: '#1E6BD6' },
  orange: { bg: '#fff7ed', text: '#FF7A00' },
  gold:   { bg: '#fffbeb', text: '#FFC400' },
  slate:  { bg: '#f1f5f9', text: '#64748b' },
};

/**
 * Badge: Small visual indicator for tags, status, or labels.
 * Uses brand-specific light backgrounds with high-contrast text.
 */
export default function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  const { bg, text } = VARIANTS[variant];

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase ${className}`}
      style={{ backgroundColor: bg, color: text }}
    >
      {children}
    </span>
  );
}
