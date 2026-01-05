export interface CityStreetSuggestion {
  name: string;
  streetCode: string;
  proposedName: string;
  reason: string;
  phone: string;
  docNumber: string;
}

export const emptyCityStreetSuggestion: CityStreetSuggestion = {
  name: "",
  streetCode: "",
  proposedName: "",
  reason: "",
  phone: "",
  docNumber: "",
};
