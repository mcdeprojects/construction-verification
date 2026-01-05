import React from "react";
import { ErrorContainer } from "./error-container.component";

interface InputProps {
  id: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  maxLength?: number;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  label: string;
  showCounter?: boolean;
  showErrorContainer?: boolean;
  value?: string;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = "text",
      placeholder,
      maxLength,
      readOnly = false,
      required = false,
      error,
      label,
      showCounter = false,
      showErrorContainer = true,
      value = "", // Valor por defecto para el contador
      className,
      ...rest // Captura onChange, onBlur y otras props de react-hook-form
    },
    ref
  ) => {
    return (
      <div className={`space-y-0.25 md:space-x-1 ${className || ""}`}>
        <label htmlFor={id} className="block text-sm font-semibold">
          {label} {required && <span className="text-primary">*</span>}
        </label>
        <input
          ref={ref}
          type={type}
          id={id}
          className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
            readOnly
              ? "bg-gray-50 dark:bg-slate-700 cursor-not-allowed select-none pointer-events-none border-gray-200 dark:border-slate-600"
              : `focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-slate-900 dark:border-slate-600 ${
                  error
                    ? "border-orange-300 focus:ring-primary"
                    : "border-gray-200 focus:ring-orange-300"
                }`
          }`}
          placeholder={placeholder}
          maxLength={maxLength}
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : 0}
          {...rest} // Pasa todas las props de react-hook-form
        />

        {showCounter && maxLength && (
          <p className="text-gray-500 text-xs">Máximo {maxLength} caracteres</p>
        )}

        {showErrorContainer && <ErrorContainer error={error} />}
      </div>
    );
  }
);

Input.displayName = "Input";
