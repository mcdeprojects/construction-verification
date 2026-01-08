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
import { Switch } from "@/components/ui/switch"
import type React from "react"
import { useState, useEffect } from "react"
import { useTerrainContext } from "@/contexts/terrain-context"
import { saveNotification } from "../interactive-map/services/notification-service"
import { Check, Copy } from "lucide-react"

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

export const FormDialog: React.FC<Props> = ({ open, onOpenChange }) => {
    const { selectedFeature, notifiedSet, setNotifiedSet } = useTerrainContext();
    const [observaciones, setObservaciones] = useState("")
    const [notificado, setNotificado] = useState(false)
    const [copied, setCopied] = useState(false);


    useEffect(() => {
        if (open && selectedFeature?.properties?.ccatastral) {
            const isNotified = notifiedSet.has(selectedFeature.properties.ccatastral);
            setNotificado(isNotified);
        } else {
            // Reset cuando cierra
            setObservaciones("");
            setNotificado(false);
            setCopied(false);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!terreno) return;
        saveNotification(terreno.ccatastral, observaciones);
        setNotifiedSet(new Set([...notifiedSet, terreno.ccatastral]));
        onOpenChange(false);
    }


    const handleCopy = async () => {
        if (!terreno?.ccatastral) return;

        try {
            await navigator.clipboard.writeText(terreno.ccatastral);
            setCopied(true);
        } catch (err) {
            console.error("Error al copiar:", err);
        }
    };

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
                    <div className="grid gap-6 py-4">
                        {/* Información del Terreno */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-sm border-b pb-2">
                                Información del Terreno
                            </h3>

                            <div className="grid grid-cols-3 gap-3 text-sm">

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Zona
                                    </Label>
                                    <p className="font-medium">{terreno.zona}</p>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Manzana
                                    </Label>
                                    <p className="font-medium">{terreno.mz}</p>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Lote
                                    </Label>
                                    <p className="font-medium">{terreno.lote}</p>
                                </div>

                                {terreno.mzAgr && (
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">
                                            Manzana Agrimensor
                                        </Label>
                                        <p className="font-medium">{terreno.mzAgr}</p>
                                    </div>
                                )}

                                {terreno.loteAgr && (
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">
                                            Lote Agrimensor
                                        </Label>
                                        <p className="font-medium">{terreno.loteAgr}</p>
                                    </div>
                                )}
                            </div>
                            <div className="col-span-2 space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Propietario
                                </Label>
                                <p className="font-medium">{terreno.propietario || "Sin información"}</p>
                            </div>

                            <div className="col-span-2 space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Cuenta Catastral
                                </Label>
                                <div className="font-medium bg-muted px-2 py-1 rounded flex justify-between items-center">

                                    <p >
                                        {terreno.ccatastral}

                                    </p>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleCopy}
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 mr-2" />
                                        ) : (
                                            <Copy className="h-4 w-4 mr-2" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                        </div>

                        {/* Observaciones */}
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
                            />
                        </div>

                        {/* Switch de Notificación */}
                        <div className="space-y-3">
                            <Label className="text-base font-semibold">¿Notificado?</Label>
                            <div className="flex items-center gap-3">
                                <span className={`text-sm font-medium transition-colors ${!notificado ? 'text-red-500' : 'text-gray-400'
                                    }`}>
                                    NO
                                </span>
                                <Switch
                                    checked={notificado}
                                    onCheckedChange={setNotificado}
                                    className="data-[state=checked]:bg-green-500"
                                />
                                <span className={`text-sm font-medium transition-colors ${notificado ? 'text-green-500' : 'text-gray-400'
                                    }`}>
                                    SI
                                </span>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={!notificado}
                        >
                            Guardar Notificación
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}