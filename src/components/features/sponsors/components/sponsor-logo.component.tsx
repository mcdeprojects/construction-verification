import { useTheme } from "@/components/theme-provider";

interface Sponsor {
    name: string;
    logo: { light: string; dark: string };
    website?: string;
    showName: boolean;
}

export const SponsorLogo: React.FC<Sponsor> = ({
    logo,
    name,
    website,
    showName,
}) => {
    const { theme } = useTheme(); //"light" | "dark" ! "system"
    const logoSrc = theme === "light" ? logo.light : logo.dark;
    const baseClass = "text-center mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300"

    const imgElement = (
        <img
            src={logoSrc}
            alt={`Logo de ${name}`}
            className={`w-full h-20 md:h-24 object-contain mx-auto transition-all duration-300`}
        />
    );

    if (website) {
        return (
            <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {imgElement}
                {showName && (
                    <p className={baseClass}>
                        {name}
                    </p>
                )}
            </a >
        );
    }

    return (
        <>
            {imgElement}
            {showName && (
                <p className={baseClass}>
                    {name}
                </p>
            )}
        </>
    )
}