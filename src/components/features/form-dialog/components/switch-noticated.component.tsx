import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type React from "react"

interface Props{
    notificado: boolean,
    setNotificado: (checked: boolean) => void
}

export const SwitchNoticated: React.FC<Props> = ({notificado, setNotificado}) => {
    return (
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
    )
}