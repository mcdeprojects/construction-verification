import React from "react";
import { ErrorContainer } from "./error-container.component";

interface TextareaProps {
    id: string;
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    rows?: number;
    required?: boolean;
    error?: string;
    label: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
    id,
    placeholder,
    maxLength,
    minLength,
    rows = 2,
    required = false,
    error,
    label,
    ...rest 
}, ref) => {
    return (
        <div className="space-y-0.25 md:space-y-1">
            <label htmlFor={id} className="block text-sm font-semibold">
                {label} {required && <span className="text-primary">*</span>}
            </label>
            <textarea
                ref={ref}
                id={id}
                rows={rows}
                className={`w-full px-4 py-3 m-0 border rounded-xl focus:outline-none focus:ring-2 
                    focus:border-transparent transition-all duration-200 bg-white dark:bg-slate-900 
                    resize-vertical placeholder-gray-400 ${error
                        ? 'border-orange-300 focus:ring-primary'
                        : 'border-gray-200 focus:ring-orange-300'
                    }`}
                placeholder={placeholder}
                maxLength={maxLength}
                {...rest} 
            />

            {maxLength && (
                <p className="text-gray-500 text-xs">
                    Máximo {maxLength} caracteres
                </p>
            )}

            <ErrorContainer error={error} />
            
        </div>
    );
});

Textarea.displayName = 'Textarea';