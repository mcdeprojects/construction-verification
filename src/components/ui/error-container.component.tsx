import type React from "react";

interface ErrorContainerProps {
    error: string | undefined
}

export const ErrorContainer: React.FC<ErrorContainerProps> = ({ error }) => {
    return (
        <>
            {error !== "" ? (
                <div className="h-4">
                    <p className="text-primary text-xs">{error}</p>
                </div>
            ) : (
                <div className="h-1">
                </div>
            )}
        </>
    )
}