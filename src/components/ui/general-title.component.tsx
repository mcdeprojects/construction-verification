import type React from "react";

interface GeneralTitleProps {
    title: string
    className?: string
}

export const GeneralTitle: React.FC<GeneralTitleProps> = ({ title, className }) => {
    return (
        <h2 className={`${className} text-primary text-4xl md:text-5xl lg:text-6xl md:leading-tight font-bold`}>
            {title}
        </h2>
    )
}