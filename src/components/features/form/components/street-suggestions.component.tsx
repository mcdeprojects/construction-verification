import React from "react";
import type { Street } from "../api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SuggestedStreet } from "./suggested-street.component";
import { Loader } from "./loader.component";
import { StreetItem } from "./street-item.component";
import { NoSuggestions } from "./no-suggesntions.component";

interface StreetSuggestionsProps {
  streets: Street[];
  onSelectSuggestion: (streetName: string) => void;
  isLoading?: boolean;
}

export const StreetSuggestions: React.FC<StreetSuggestionsProps> = ({
  streets,
  onSelectSuggestion,
  isLoading = false,
}) => {
  const hasSuggestions = streets.length > 0;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full p-4 md:p-6 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 transition-all duration-200">
      {hasSuggestions ? (
        <div className="space-y-4">
          <SuggestedStreet />

          {streets.length < 3 ? (
            <div className="space-y-1">
              {streets.map((street) => (
                <StreetItem
                  key={street.street_code}
                  street={street}
                  onSelect={onSelectSuggestion}
                />
              ))}
            </div>
          ) : (
            <ScrollArea className="h-[120px] w-full">
              <div className="space-y-1">
                {streets.map((street) => (
                  <StreetItem
                    key={street.street_code}
                    street={street}
                    onSelect={onSelectSuggestion}
                  />
                ))}
              </div>
            </ScrollArea>
          )}

          <p className="text-xs text-gray-500 dark:text-slate-400 text-center mt-4">
            El número indica cuántas veces se ha propuesto cada nombre.
          </p>
        </div>
      ) : (
        <NoSuggestions />
      )}
    </div>
  );
};
