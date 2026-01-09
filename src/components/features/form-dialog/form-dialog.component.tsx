import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type React from "react"
import { useState, useEffect } from "react"
import { useTerrainContext } from "@/contexts/terrain-context"
import { saveNotification } from "../interactive-map/services/notification-service"
import { SwitchNoticated, TerrainInformation } from "./components"
import { Loader2 } from "lucide-react"
import { ImageUpload } from "./components/image-upload.component"
import { uploadImage } from "./api/upload-image"
import { getNotifiedTerrain, type NotifiedTerrain } from "./api/get-notified-terrain"
import { ExistingPhoto } from "./components/existing-photo.component"

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

export const FormDialog: React.FC<Props> = ({ open, onOpenChange }) => {
    const { selectedFeature, notifiedSet, setNotifiedSet } = useTerrainContext();
    const [observaciones, setObservaciones] = useState("")
    const [notificado, setNotificado] = useState(false)
    const [copied, setCopied] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notifiedTerrain, setNotifiedTerrain] = useState<NotifiedTerrain>()


    useEffect(() => {
        if (open && selectedFeature?.properties?.ccatastral) {
            const ccatastral = selectedFeature.properties.ccatastral
            const isNotified = notifiedSet.has(ccatastral);
            if (isNotified)
                getNotifiedTerrain(ccatastral).then((terrain) => {
                    if (terrain)
                        setNotifiedTerrain(terrain)
                    setObservaciones(notifiedTerrain?.observations as string)

                });
            setNotificado(isNotified);
        } else {
            setObservaciones("");
            setNotificado(false);
            setCopied(false);
            setImageFile(null);
        }
    }, [open, selectedFeature, notifiedSet]);

    const terreno = selectedFeature?.properties ? {
        fid: String(selectedFeature.properties.fid ?? ""),
        objectId: String(selectedFeature.properties.objectid ?? ""),
        padron: String(selectedFeature.properties.padron ?? "0"),
        zona: String(selectedFeature.properties.zona ?? ""),
        mz: String(selectedFeature.properties.mz ?? ""),
        lote: String(selectedFeature.properties.lote ?? ""),
        nombreObj: selectedFeature.properties.nombre_obj ?? "Sin información",
        ccatastral: selectedFeature.properties.ccatastral ?? "",
        loteAgr: selectedFeature.properties.lote_agr ?? "",
        mzAgr: selectedFeature.properties.mz_agr ?? "",
        propietario: selectedFeature.properties.PROPIETARIO ?? "",
    } : null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!terreno) return;

        setIsSubmitting(true);

        try {
            let imagePath: string | null = null;

            // Subir imagen si existe
            if (imageFile) {
                const { url, error } = await uploadImage(imageFile, terreno.ccatastral);

                if (error) {
                    console.error('Error al subir imagen:', error);
                    alert('Error al subir la imagen. Intenta nuevamente.');
                    setIsSubmitting(false);
                    return;
                }

                imagePath = url!;
            }

            // Guardar notificación con la ruta de la imagen
            await saveNotification(terreno.ccatastral, observaciones, imagePath!);

            setNotifiedSet(new Set([...notifiedSet, terreno.ccatastral]));
            onOpenChange(false);
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Error al guardar la notificación');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!terreno) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogOverlay className="z-[1001]" />
            </DialogPortal>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto z-[1001]">
                <DialogHeader>
                    <DialogTitle>Notificación de Terreno</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <TerrainInformation terreno={terreno} copied={copied} setCopied={setCopied} />
                        {
                            !notificado ?
                                <ImageUpload
                                    value={imageFile}
                                    onChange={setImageFile}
                                    disabled={isSubmitting}
                                />
                                :
                                <ExistingPhoto image={notifiedTerrain?.imagen_url as string} />
                        }

                        <div className="space-y-2">
                            <Label htmlFor="observaciones">
                                Observaciones
                            </Label>
                            <Textarea
                                id="observaciones"
                                placeholder="Ingrese las observaciones del terreno..."
                                value={observaciones}
                                onChange={(e) => setObservaciones(e.target.value)}
                                rows={4}
                                className="resize-none"
                                disabled={isSubmitting}
                            />
                        </div>
                        
                        <SwitchNoticated
                            notificado={notificado}
                            setNotificado={setNotificado}
                        />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isSubmitting}>
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={!notificado || isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                'Guardar Notificación'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}