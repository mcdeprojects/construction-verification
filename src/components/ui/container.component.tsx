import React from 'react'

interface Props {
    className?: string;
    id?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ children, className, id }: React.PropsWithChildren<Props>) => {
    return (
        <div id={id} className={`px-2 md:px-5 w-full max-w-5xl mx-auto ${className ? className : ""}`}>{children}</div>
    )
}