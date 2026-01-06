import React from "react";
import { emptyCityStreetSuggestion, type CityStreetSuggestion } from "@/components/features/form";
import { Container, LazySection } from "@/components";
import { LazyInteractiveMap } from "@/components/features/lazy-components";
import { SECTION_IDS } from "@/data";
import { Fallback } from "@/components/ui/fallback.component";
import { Footer } from "@/components/features";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/features/form-dialog/form-dialog.component";

export const HomePage: React.FC = () => {
    const [formData, setFormData] = React.useState<CityStreetSuggestion>(emptyCityStreetSuggestion);
    const [foundStreetCode, setFoundStreetCode] = React.useState<string | undefined>();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)

    const handleStreetSelect = (codigo: string) => {
        console.log("Calle con nombre");
        
        setFormData(prev => ({
            ...prev,
            streetCode: codigo
        }));
        setFoundStreetCode(undefined);
    };

    const handleModal = () => {
        setIsDialogOpen(true)
    }

    return (
        <>
            <Container
                id={SECTION_IDS.interactiveMap}
                className="pt-24 min-h-screen flex flex-col"
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
                        <LazyInteractiveMap
                            onStreetSelect={handleStreetSelect}
                            selectedStreetCode={formData.streetCode}
                            foundStreetCode={foundStreetCode}
                            setFoundStreetCode={setFoundStreetCode}
                        />
                    </LazySection>
                </div>
            </Container>
            
            <FormDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <Footer />
        </>
    );
};