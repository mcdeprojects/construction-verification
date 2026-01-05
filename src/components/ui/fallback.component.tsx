interface FallbackProps {
    text: string;
    className?: string;
}

export const Fallback: React.FC<FallbackProps> = ({ text, className }) => {
    return (
        <div className={`${className} flex flex-col justify-center items-center`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-primary text-2xl italic">{text}</p>
        </div>
    );
};