import React from "react";
import { Container, LazySection } from "@/components";
import { LazyInteractiveMap } from "@/components/features/lazy-components";
import { SECTION_IDS } from "@/data";
import { Fallback } from "@/components/ui/fallback.component";
import { Footer } from "@/components/features";
import { FormDialog } from "@/components/features/form-dialog/form-dialog.component";
import { TerrainProvider, useTerrainContext } from "@/contexts";

const HomePageContent: React.FC = () => {
    
    const { isDialogOpen, closeDialog } = useTerrainContext();

    return (
        <>
            <Container
                id={SECTION_IDS.interactiveMap}
                className="pt-24 flex flex-col"
            >
                <div className="flex-1">
                    <LazySection
                        rootMargin="300px"
                        fallback={
                            <Fallback
                                className="pt-24 min-h-screen"
                                text="Cargando mapa interactivo..."
                            />
                        }
                    >
                        <LazyInteractiveMap />
                    </LazySection>
                </div>
            </Container>

            <FormDialog open={isDialogOpen} onOpenChange={closeDialog} />
            <Footer />
        </>
    );
};

export const HomePage: React.FC = () => {
    return (
        <TerrainProvider>
            <HomePageContent />
        </TerrainProvider>
    );
};