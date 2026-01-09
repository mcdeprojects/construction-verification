import { supabase } from "@/lib/supabase";

export const getNotifiedSet = async (): Promise<Set<string>> => {
  // Obtener SOLO los ccatastrals de terrenos notificados
  const { data } = await supabase
    .from('notificaciones')
    .select('ccatastral');
  
  // Convertir a Set para búsqueda O(1)
  return new Set(data?.map(n => n.ccatastral) || []);
};

export const saveNotification = async (ccatastral: string, observations: string, imagePath: string) => {
  const { error } = await supabase
    .from('notificaciones')
    .insert({
      ccatastral,
      observations,
      notified_at: new Date().toISOString(),
      imagen_url: imagePath
    });
  
  if (error) throw error;
};