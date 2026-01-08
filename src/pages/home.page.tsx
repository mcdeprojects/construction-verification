import React from "react";
import { LazySection } from "@/components";
import { LazyInteractiveMap } from "@/components/features/lazy-components";
import { Fallback } from "@/components/ui/fallback.component";
import { FormDialog } from "@/components/features/form-dialog/form-dialog.component";
import { TerrainProvider, useTerrainContext } from "@/contexts";

const HomePageContent: React.FC = () => {

    const { isDialogOpen, closeDialog } = useTerrainContext();

    return (
        <>

            <div className="flex-1 pt-20 px-5">
                <LazySection
                    rootMargin="300px"
                    fallback={
                        <Fallback
                            className="pt-24 min-h-screen"
                            text="Cargando mapa..."
                        />
                    }
                >
                    <LazyInteractiveMap />
                </LazySection>
            </div>


            <FormDialog open={isDialogOpen} onOpenChange={closeDialog} />
            {/*<Footer />*/}
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