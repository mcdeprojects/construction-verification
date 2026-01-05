import { Check } from "lucide-react";
import type React from "react";
import type { Street } from "../api";

interface StreetItemProps {
  street: Street;
  onSelect: (name: string) => void;
}

export const StreetItem: React.FC<StreetItemProps> = ({ street, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(street.street_name)}
    className="w-full flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 hover:border-primary hover:bg-orange-50 dark:hover:bg-slate-700 dark:hover:border-primary transition-all duration-200 cursor-pointer group"
  >
    <div className="flex-shrink-0 w-6 h-6 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center border border-gray-200 dark:border-slate-600 group-hover:border-primary group-hover:bg-primary/10 transition-colors">
      <span className="text-xs font-semibold text-gray-600 dark:text-slate-300 group-hover:text-primary">
        {street.count}
      </span>
    </div>
    <div className="flex-1 min-w-0 text-left">
      <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
        {street.street_name}
      </p>
    </div>
    <Check className="w-4 h-4 text-gray-400 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
  </button>
);