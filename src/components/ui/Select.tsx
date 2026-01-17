import { forwardRef } from 'react';
import clsx from 'clsx';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helpText?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helpText, options, className, id, ...props }, ref) => {
    const hasError = !!error;
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={clsx(
            'block w-full rounded-md shadow-sm sm:text-sm px-3 py-2',
            'focus:ring-2 focus:ring-offset-0 focus:outline-none',
            'transition-colors duration-200',
            {
              'border-gray-300 focus:border-blue-500 focus:ring-blue-500':
                !hasError,
              'border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900':
                hasError,
            },
            className
          )}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${selectId}-error` : helpText ? `${selectId}-help` : undefined
          }
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {helpText && !hasError && (
          <p id={`${selectId}-help`} className="mt-1 text-sm text-gray-500">
            {helpText}
          </p>
        )}
        {hasError && (
          <p id={`${selectId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
