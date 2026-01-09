import { supabase } from "@/lib/supabase";

const BUCKET_NAME = 'terrain-images';

export async function uploadImage(file: File, ccatastral: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${ccatastral}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      return { path: null, error };
    }

    const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);
    
    return { 
        url: urlData.publicUrl, 
        error: null 
    };
  } catch (error) {
    return { path: null, error };
  }
}