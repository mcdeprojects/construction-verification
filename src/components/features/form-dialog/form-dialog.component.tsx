import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
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
import { useState } from "react"

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

export const FormDialog: React.FC<Props> = ({ open, onOpenChange }) => {
    const [observaciones, setObservaciones] = useState("")
    const [notificado, setNotificado] = useState(false)

    // Datos de ejemplo del terreno (aquí conectarías con tus datos reales)
    const terreno = {
        fid: "86608",
        objectId: "86373",
        padron: "0",
        zona: "26",
        lote: "8",
        nombreObj: "Derivado",
        ccatastral: "K042632008",
        loteAgr: "8"
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí procesas el formulario
        console.log({ observaciones, notificado })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPortal>
                <DialogOverlay className="z-[1000]" />
            </DialogPortal>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto z-[1001]">
                <DialogHeader>
                    <DialogTitle>Notificación de Terreno</DialogTitle>
                    <DialogDescription>
                        Complete la información y notifique al propietario
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 py-4">
                        {/* Información del Terreno */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-sm border-b pb-2">
                                Información del Terreno
                            </h3>

                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        FID
                                    </Label>
                                    <p className="font-medium">{terreno.fid}</p>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Object ID
                                    </Label>
                                    <p className="font-medium">{terreno.objectId}</p>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Padrón
                                    </Label>
                                    <p className="font-medium">{terreno.padron}</p>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Zona
                                    </Label>
                                    <p className="font-medium">{terreno.zona}</p>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Lote
                                    </Label>
                                    <p className="font-medium">{terreno.lote}</p>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Lote Agrupado
                                    </Label>
                                    <p className="font-medium">{terreno.loteAgr}</p>
                                </div>

                                <div className="col-span-2 space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Propietario
                                    </Label>
                                    <p className="font-medium">{terreno.nombreObj}</p>
                                </div>

                                <div className="col-span-2 space-y-1">
                                    <Label className="text-xs text-muted-foreground">
                                        Cuenta Catastral
                                    </Label>
                                    <p className="font-medium font-mono text-xs bg-muted px-2 py-1 rounded">
                                        {terreno.ccatastral}
                                    </p>
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
                            disabled={!notificado || !observaciones.trim()}
                        >
                            Guardar Notificación
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}