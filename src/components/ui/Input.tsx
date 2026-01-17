import { forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  prefix?: string;
  suffix?: string;
  // Note: placeholder is already part of HTMLInputElement props
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, prefix, suffix, className, id, ...props }, ref) => {
    const hasError = !!error;
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{prefix}</span>
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'block w-full rounded-md shadow-sm sm:text-sm px-3 py-2',
              'focus:ring-2 focus:ring-offset-0 focus:outline-none',
              'transition-colors duration-200',
              {
                'pl-7': prefix,
                'pr-10': suffix,
                'border-gray-300 focus:border-blue-500 focus:ring-blue-500':
                  !hasError,
                'border-red-300 focus:border-red-500 focus:ring-red-500 text-red-900':
                  hasError,
              },
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined
            }
            {...props}
          />
          {suffix && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">{suffix}</span>
            </div>
          )}
        </div>
        {helpText && !hasError && (
          <p id={`${inputId}-help`} className="mt-1 text-sm text-gray-500">
            {helpText}
          </p>
        )}
        {hasError && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
