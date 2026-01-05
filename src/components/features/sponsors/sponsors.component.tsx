import type React from "react";
import { Container, GeneralTitle } from "@/components/ui"
import { currentSponsors } from "./sponsor.data";
import { SponsorLogo, SponsorshipCard, SponsorText } from "./components";

export const Sponsors: React.FC<{ id: string }> = ({ id }) => {

    return (
        <Container
            id={id}
            className="pt-24 min-h-screen flex flex-col"
        >
            <GeneralTitle
                className="text-center mb-4 pb-0"
                title="Nuestros Patrocinadores"
            />
            <div className="flex-1">
                <SponsorText />
                <div className="mb-16">
                    <h3
                        className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                        Empresas que nos apoyan
                    </h3>
                    <div className={`grid gap-6 md:gap-8 
                            ${currentSponsors.length === 1
                            ? 'grid-cols-1 md:max-w-xs mx-auto'
                            : currentSponsors.length === 2
                                ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto lg:max-w-2xl'
                                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                        {currentSponsors.map((sponsor) => (
                            <div
                                key={sponsor.id}
                                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-6 md:p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <SponsorLogo
                                    logo={sponsor.logo}
                                    name={sponsor.name}
                                    website={sponsor.website}
                                    showName={sponsor.showName}
                                    key={sponsor.id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <SponsorshipCard />
            </div>
        </Container>
    );
};