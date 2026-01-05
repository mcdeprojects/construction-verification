import { supabase } from "@/lib/supabase";
import type { CityStreetSuggestion } from "./form.utils";

export async function createStreetProposal(input: CityStreetSuggestion) {
  const { error } = await supabase.from("streets").insert([
    {
      street_code: input.streetCode.trim(),
      full_name: input.name.trim(),
      street_name: input.proposedName.trim(),
      reason: input.reason.trim(),
      phone: input.phone.trim(),
      doc_number: input.docNumber.trim(),
    },
  ]);

  if (error) throw error;
}

export interface Root {
  streets: Street[];
}

export interface Street {
  id: number;
  street_name: string;
  street_code: string;
  count: number
}

export const getStreets = async (streetCode: string): Promise<Street[]> => {
  const { data, error } = await supabase
    .from("street_names")
    .select("*")
    .eq("street_code", streetCode);

  if (error) throw error;

  // Agrupar y contar en el cliente
  const grouped = data.reduce((acc, curr) => {
    const existing = acc.find((item: Street) => item.street_name === curr.street_name);
    if (existing) {
      existing.count++;
    } else {
      acc.push({
        street_name: curr.street_name,
        street_code: curr.street_code,
        count: 1,
      });
    }
    return acc;
  }, [] as Array<{ street_name: string; street_code: string; count: number }>);

  return grouped;
};
