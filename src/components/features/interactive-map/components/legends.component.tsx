import { legendsColors } from "../styles";

export const Legends: React.FC = () => {
    return (
        <div
            className="mb-4 p-4 border-2 rounded-lg"
            style={{ borderColor: legendsColors.border }}
        >
            <h3 className="text-sm md:text-base lg:text-lg font-semibold mb-2">Leyenda:</h3>
            <div className="flex flex-wrap gap-4 text-base">
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-1"
                        style={{ backgroundColor: legendsColors.unnotified }}
                    ></div>
                    <span>Sin notificar o con construcción</span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-1"
                        style={{ backgroundColor: legendsColors.notified}}
                    ></div>
                    <span>Notificado o sin construcción</span>
                </div>
                
   
            </div>
        </div>
    );
};