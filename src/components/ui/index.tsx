import Link from 'next/link';
import { type ReactNode, useState, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   IBT Solutions — UI Component Library v2
   Caribbean Dark Theme
   ═══════════════════════════════════════════════════════════ */

/* ─── Button ─── */
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  className = '',
  onClick,
  type = 'button',
  disabled,
  loading,
  icon,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-teal-500 hover:bg-teal-400 text-ocean-900 font-semibold shadow-[0_4px_15px_rgba(20,184,166,0.3),_0_4px_0_#0d9488] hover:shadow-[0_6px_20px_rgba(20,184,166,0.5),_0_4px_0_#0d9488] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_5px_rgba(0,0,0,0.6),_0_0_0_#0d9488] transition-all duration-100',
    secondary:
      'bg-surface-2 hover:bg-surface-3 text-white border border-surface-3 active:scale-[0.98]',
    outline:
      'border-2 border-teal-500/50 text-teal-400 hover:bg-teal-500/10 hover:border-teal-400 active:scale-[0.98]',
    ghost: 'text-slate-300 hover:text-white hover:bg-surface-2 active:scale-[0.98]',
    danger:
      'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled || loading}>
      {loading ? (
        <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}

/* ─── Section ─── */
interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* ─── Section Header ─── */
interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export function SectionHeader({ badge, title, subtitle, center = true, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-4">
          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
          {badge}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

/* ─── Card ─── */
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      className={`
        rounded-2xl bg-surface-1 border border-surface-3 p-6
        ${hover ? 'hover:border-teal-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

/* ─── Service Card ─── */
interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  image?: string;
  icon?: ReactNode;
}

export function ServiceCard({ title, description, href, image, icon }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden bg-surface-1 border border-surface-3 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-1"
    >
      {image && (
        <div className="aspect-[16/10] overflow-hidden bg-surface-2">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="p-5">
        {icon && <div className="text-teal-400 mb-3">{icon}</div>}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}

/* ─── Stat ─── */
interface StatProps {
  value: string;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}

/* ─── Badge ─── */
interface BadgeProps {
  children: ReactNode;
  variant?: 'teal' | 'emerald' | 'sunset' | 'slate' | 'red';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'teal', size = 'sm', className = '' }: BadgeProps) {
  const variants = {
    teal: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    sunset: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    slate: 'bg-surface-2 border-surface-3 text-slate-300',
    red: 'bg-red-500/10 border-red-500/20 text-red-400',
  };
  const sizes = { sm: 'px-3 py-1 text-xs', md: 'px-4 py-1.5 text-sm' };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

/* ─── Gradient Text ─── */
interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span className={`bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

/* ─── Input ─── */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <input
          className={`
            w-full bg-surface-2 border border-surface-3 rounded-xl px-4 py-3 text-sm text-white
            placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}

/* ─── Textarea ─── */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>}
      <textarea
        className={`
          w-full bg-surface-2 border border-surface-3 rounded-xl px-4 py-3 text-sm text-white
          placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30
          disabled:opacity-50 disabled:cursor-not-allowed resize-none
          ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}

/* ─── Select ─── */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>}
      <select
        className={`
          w-full bg-surface-2 border border-surface-3 rounded-xl px-4 py-3 text-sm text-white
          focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30
          disabled:opacity-50 disabled:cursor-not-allowed appearance-none
          ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/30' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}

/* ─── Modal ─── */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, size = 'md', footer }: ModalProps) {
  if (!open) return null;

  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full bg-surface-1 border border-surface-3 rounded-2xl shadow-xl ${sizes[size]}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-3">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-surface-2 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-surface-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Toast ─── */
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  const colors = {
    success: 'border-emerald-500/30 bg-emerald-500/10',
    error: 'border-red-500/30 bg-red-500/10',
    warning: 'border-orange-500/30 bg-orange-500/10',
    info: 'border-teal-500/30 bg-teal-500/10',
  };
  const textColors = {
    success: 'text-emerald-400',
    error: 'text-red-400',
    warning: 'text-orange-400',
    info: 'text-teal-400',
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${colors[type]}`}>
      <span className={`text-sm font-medium ${textColors[type]}`}>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-auto text-slate-400 hover:text-white text-sm">
          ✕
        </button>
      )}
    </div>
  );
}

/* ─── Skeleton ─── */
interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  circle?: boolean;
}

export function Skeleton({ className, width, height, circle }: SkeletonProps) {
  return (
    <div
      className={`bg-surface-2 rounded animate-pulse ${circle ? 'rounded-full' : 'rounded-lg'} ${className || ''}`}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <Card>
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-20" />
    </Card>
  );
}

/* ─── Empty State ─── */
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon && <div className="text-slate-500 mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-slate-300">{title}</h3>
      {description && <p className="text-sm text-slate-500 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* ─── Table ─── */
interface TableProps {
  headers: string[];
  children: ReactNode;
  className?: string;
}

export function Table({ headers, children, className = '' }: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-3">
            {headers.map((h, i) => (
              <th key={i} className="text-left text-slate-400 font-medium px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

/* ─── Container ─── */
interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ children, className = '', size = 'lg' }: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };
  return <div className={`${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/* ─── Divider ─── */
export function Divider({ className = '' }: { className?: string }) {
  return <hr className={`border-surface-3 ${className}`} />;
}
