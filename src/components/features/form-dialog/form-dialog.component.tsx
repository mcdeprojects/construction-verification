import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type React from "react"
import { useState } from "react"

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void,
}

export const FormDialog: React.FC<Props> = ({ open, onOpenChange }) => {
    const [observaciones, setObservaciones] = useState("")
    const [notificado, setNotificado] = useState(false)
    const [isSliding, setIsSliding] = useState(false)

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

    const handleSlideNotification = () => {
        setIsSliding(true)
        setTimeout(() => {
            setNotificado(true)
            setIsSliding(false)
        }, 300)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí procesas el formulario
        console.log({ observaciones, notificado })
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto z-[999]">
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

                        {/* Botón de Notificación Deslizante */}
                        <div className="space-y-2">
                            <Label>Estado de Notificación</Label>
                            <div
                                className={`relative h-12 rounded-full border-2 overflow-hidden cursor-pointer transition-colors ${
                                    notificado 
                                        ? 'bg-green-500 border-green-600' 
                                        : 'bg-gray-200 border-gray-300'
                                }`}
                                onClick={!notificado ? handleSlideNotification : undefined}
                            >
                                <div
                                    className={`absolute inset-y-0 left-0 flex items-center justify-center transition-all duration-300 ${
                                        notificado ? 'w-full' : 'w-1/2'
                                    }`}
                                >
                                    <span className={`text-sm font-semibold ${
                                        notificado ? 'text-white' : 'text-gray-600'
                                    }`}>
                                        {notificado ? '✓ Propietario Notificado' : 'Deslizar para Notificar'}
                                    </span>
                                </div>
                                
                                {!notificado && (
                                    <div
                                        className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] bg-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ${
                                            isSliding ? 'translate-x-full' : 'translate-x-0'
                                        }`}
                                    >
                                        <span className="text-xl">→</span>
                                    </div>
                                )}
                            </div>
                            {notificado && (
                                <p className="text-xs text-green-600 text-center">
                                    Notificación registrada correctamente
                                </p>
                            )}
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