import type React from "react";

interface Props {
    image: string
}

export const ExistingPhoto: React.FC<Props> = ({ image }) => {
    return (
        <div className="relative rounded-lg overflow-hidden border">
            <img
                src={image}
                alt="Preview"
                className="w-full h-48 object-cover"
            />
        </div>
    )
}