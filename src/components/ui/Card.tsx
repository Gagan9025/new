import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> & {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  Content: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Footer: React.FC<React.HTMLAttributes<HTMLDivElement>>;
} = ({ children, hoverable = false, glass = true, className = '', ...props }) => {
  const baseStyle = glass ? 'glass-panel' : 'bg-white dark:bg-darkCard border border-slate-200 dark:border-darkBorder';
  const hoverStyle = hoverable ? 'hover:shadow-lg hover:shadow-accentIndigo/5 hover:border-accentIndigo/30 dark:hover:border-accentTeal/30 transition-all duration-300 hover:-translate-y-1' : '';
  
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-sm ${baseStyle} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 py-4 border-b border-slate-100 dark:border-darkBorder/40 flex items-center justify-between ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-lg font-bold text-slate-800 dark:text-slate-100 ${className}`} {...props}>
      {children}
    </h3>
  );
};

const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 py-5 ${className}`} {...props}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 py-4 bg-slate-50/50 dark:bg-darkBg/30 border-t border-slate-100 dark:border-darkBorder/40 flex items-center justify-end ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;
