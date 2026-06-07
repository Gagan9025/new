import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-accentIndigo to-accentTeal hover:from-accentIndigo/90 hover:to-accentTeal/90 text-white shadow-md hover:shadow-lg hover:shadow-accentIndigo/20 focus:ring-accentIndigo active:scale-[0.98]',
    secondary: 'bg-slate-100 hover:bg-slate-200 dark:bg-darkCard dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-darkBorder focus:ring-slate-500 active:scale-[0.98]',
    outline: 'bg-transparent border-2 border-accentIndigo text-accentIndigo hover:bg-accentIndigo hover:text-white dark:border-accentTeal dark:text-accentTeal dark:hover:bg-accentTeal dark:hover:text-darkBg focus:ring-accentIndigo active:scale-[0.98]',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-red-500/20 focus:ring-red-500 active:scale-[0.98]',
    glass: 'bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-md border border-white/20 text-slate-800 dark:text-white focus:ring-accentTeal active:scale-[0.98]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base'
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2 inline-flex">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2 inline-flex">{rightIcon}</span>}
    </button>
  );
};
