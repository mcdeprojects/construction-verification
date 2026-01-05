interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
}

export const CustomBotton: React.FC<ButtonProps> = ({
    type = 'button',
    disabled = false,
    loading = false,
    onClick,
    children,
    variant = 'primary',
    className = '',
}) => {
    const baseClasses = "text-lg w-full py-4 px-6 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 transform shadow-lg cursor-pointer";

    const variantClasses = {
        primary: `
        bg-orange-500 
        tracking-wider 
        hover:scale-[1.02] 
        focus:ring-primary 
        focus:ring-opacity-50
      `,
        secondary: `
        bg-gray-200 
        dark:bg-slate-700 
        text-gray-800 
        hover:bg-gray-300 
        dark:hover:bg-slate-600
        focus:ring-gray-400
        dark:focus:ring-slate-500
      `,
    };

    const disabledClasses = `
      disabled:bg-gray-400 
      disabled:text-gray-600 
      disabled:cursor-not-allowed 
      disabled:hover:scale-100 
      disabled:shadow-none
      dark:disabled:bg-gray-600 
      dark:disabled:text-gray-400
    `;

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className} mt-2`}
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
};