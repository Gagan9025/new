import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  options,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label 
          htmlFor={selectId} 
          className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
        >
          {label}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        className={`glass-input w-full py-2 px-3 text-sm cursor-pointer ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-darkCard text-slate-800 dark:text-slate-200">
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
});

Select.displayName = 'Select';
