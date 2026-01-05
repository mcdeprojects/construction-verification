import React from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
export type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
    type?: AlertType;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export const Alert: React.FC<AlertProps> = ({
    type = 'info',
    title,
    children,
    className = '',
}) => {
    const typeClasses = {
        info: `
            bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-700
            dark:from-blue-900/40 dark:to-indigo-900/40 dark:border-blue-700 dark:text-blue-200
        `,
        success: `
            bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700
            dark:from-green-900/40 dark:to-emerald-900/40 dark:border-green-700 dark:text-green-200
        `,
        warning: `
            bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 text-yellow-700
            dark:from-yellow-900/40 dark:to-amber-900/40 dark:border-yellow-700 dark:text-yellow-200
        `,
        error: `
            bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-700
            dark:from-red-900/40 dark:to-pink-900/40 dark:border-red-700 dark:text-red-200
        `,
    };

    const icons = {
        info: Info,
        success: CheckCircle,
        warning: AlertTriangle,
        error: XCircle,
    };

    const iconColors = {
        info: 'text-blue-500 dark:text-blue-400',
        success: 'text-green-500 dark:text-green-400',
        warning: 'text-yellow-500 dark:text-yellow-400',
        error: 'text-red-500 dark:text-red-400',
    };

    const IconComponent = icons[type];

    return (
        <div className={`p-4 rounded-xl border ${typeClasses[type]} ${className}`}>
            <div className="flex items-center gap-3">
                <IconComponent className={`w-5 h-5 ${iconColors[type]} flex-shrink-0`} />
                <div className="text-sm font-medium">
                    {title && <strong className="block">{title}</strong>}
                    {children}
                </div>
            </div>
        </div>
    );
};
