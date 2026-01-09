import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Check, Copy } from "lucide-react"
import type React from "react";

interface Props {
    terreno: {
        fid: string;
        objectId: string;
        padron: string;
        zona: string;
        mz: string;
        lote: string;
        nombreObj: string;
        ccatastral: string;
        loteAgr: string;
        mzAgr: string;
        propietario: string;
    },
    copied: boolean,
    setCopied: React.Dispatch<React.SetStateAction<boolean>>

}

export const TerrainInformation: React.FC<Props> = ({ terreno, copied, setCopied }) => {
    const handleCopy = async () => {
        if (!terreno?.ccatastral) return;

        try {
            await navigator.clipboard.writeText(terreno.ccatastral);
            setCopied(true);
        } catch (err) {
            console.error("Error al copiar:", err);
        }
    };

    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-sm border-b">
            </h3>

            <div className="grid grid-cols-5 gap-1 text-sm">

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
                            MzAgr
                        </Label>
                        <p className="font-medium">{terreno.mzAgr}</p>
                    </div>
                )}

                {terreno.loteAgr && (
                    <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                            LoteAgr
                        </Label>
                        <p className="font-medium">{terreno.loteAgr}</p>
                    </div>
                )}
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

            <div className="col-span-2 space-y-1">
                <Label className="text-xs text-muted-foreground">
                    Propietario
                </Label>
                <p className="font-medium">{terreno.propietario || "Sin información"}</p>
            </div>
        </div>

    )
}