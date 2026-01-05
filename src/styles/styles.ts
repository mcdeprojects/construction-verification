export const colors = {
  primary: "#f8a614", // Orange
};

export const streetColors = {
  default: "#808080", // Gray for default streets
  selected: "#FFFF33", //Yellow gold for selected streets
  withoutName: "#f05c04", // Orange for streets without names
  found: "#22c55e", // Green for found streets
};

export const streetWidth = {
  default: 7,
  selected: 10,
  found: 10,
};

export const getStreetWidth = (baseWeight: number) => ({
  default: baseWeight,
  found: baseWeight * 1.8, // Calles encontradas/seleccionadas 80% más gruesas
  withoutName: baseWeight * 0.9, // Opcional: calles sin nombre un poco más finas
});
