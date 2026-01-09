import { supabase } from "@/lib/supabase";

export interface NotifiedTerrain {
  id: number
  ccatastral: string
  notified_at: string
  notified_by: any
  observations: string
  cuenta_catastral: any
  status: string
  created_at: string
  updated_at: string
  imagen_url: string
}

export const getNotifiedTerrain = async(ccatastral:string): Promise<NotifiedTerrain | null>=> {
  const {data, error}= await supabase
  .from('notificaciones')
  .select('*')
  .eq('ccatastral', ccatastral);

  if (error) throw error;

  return data[0];
}