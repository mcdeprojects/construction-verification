import { Lightbulb } from "lucide-react";
import type React from "react";

export const NoSuggestions: React.FC = () => (
  <div className="text-center space-y-4">
    <div className="inline-flex w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full items-center justify-center">
      <Lightbulb className="w-8 h-8 text-primary" />
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Sé el primero en dar una sugerencia
      </h3>
      <p className="text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto">
        Esta calle aún no tiene sugerencias de nombres. ¡Ayuda a la comunidad
        siendo el primero en sugerir un nombre!
      </p>
    </div>
  </div>
);
