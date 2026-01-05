interface FormHeaderProps {
    title: React.ReactNode;
    description: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, description }) => (
    <div className="text-center max-w-md pt-2 pb-10 md:px-5">
        <h1 className="text-3xl lg:text-5xl lg:leading-tight font-bold mb-4">
            {title}
        </h1>
        <p className="text-base lg:text-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {description}
        </p>
    </div>
);