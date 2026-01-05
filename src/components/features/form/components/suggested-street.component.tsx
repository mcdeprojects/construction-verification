import { Lightbulb } from "lucide-react";
import type React from "react";

export const SuggestedStreet: React.FC = () => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
      <Lightbulb className="w-5 h-5 text-primary" />
    </div>
    <div className="flex-1">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        Esta calle ya tiene sugerencias
      </h3>
      <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
        Haz clic en una sugerencia para seleccionarla o escribe tu propia propuesta.
      </p>
    </div>
  </div>
);
