import Link from 'next/link';
import { ReactNode, ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** Target URL. If provided, renders as an anchor/Link. */
  href?: string;
  /** Primary, secondary, ghost, or white style variant. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'white';
  /** Button sizing. */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label for screen readers. */
  'aria-label'?: string;
}

const BASE = 'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-60 disabled:pointer-events-none active:scale-95';

const VARIANTS = {
  primary:   'text-white',
  secondary: 'bg-white text-blue-600 border border-slate-200 hover:border-blue-400 hover:shadow-md',
  ghost:     'text-white border border-white/30 hover:bg-white/10',
  white:     'bg-white text-blue-600 hover:shadow-md',
};

const SIZES = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

const primaryStyle = {
  background: 'linear-gradient(135deg,#1E6BD6,#1557c0)',
  boxShadow:  '0 4px 14px rgba(30,107,214,.35)',
};

/**
 * Button component: Versatile interactive element supporting both button and link behaviors.
 */
export default function Button({
  href, variant = 'primary', size = 'md', className = '', children, ...props
}: ButtonProps) {
  const cls = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const style = variant === 'primary' ? primaryStyle : undefined;

  if (href) {
    // We separate button-only props if necessary, but for a standard Link
    // most common standard props like 'id', 'className', 'style' are valid.
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} style={style} {...props}>
      {children}
    </button>
  );
}
