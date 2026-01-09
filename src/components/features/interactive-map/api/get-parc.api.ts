import { supabase } from "@/lib/supabase";
import type { Parc } from "../components";
import { parcelasCache } from "@/utlis/map-cache";

const fetchAllParcelas = async (): Promise<any[]> => {
  const PAGE_SIZE = 1000;
  let allData: any[] = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from('parcelas')
      .select('*')
      .order('id')
      .range(from, to);

    if (error) throw error;

    if (data && data.length > 0) {
      allData = [...allData, ...data];
      page++;

      if (data.length < PAGE_SIZE) {
        hasMore = false;
      }
    } else {
      hasMore = false;
    }
  }

  return allData;
};

const getParcelasCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('parcelas')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count || 0;
};

const transformToGeoJSON = (rows: any[]): Parc => {
  const features = rows.map(row => ({
    type: 'Feature',
    properties: {
      fid: row.fid,
      objectid: row.objectid,
      dpto: row.dpto,
      dist: row.dist,
      padron: row.padron,
      zona: row.zona,
      mz: row.mz,
      lote: row.lote,
      ccatastral: row.ccatastral,
      t_mesa: row.t_mesa,
      EXP: row.exp,
      gest: row.gest,
      mz_agr: row.mz_agr,
      lote_agr: row.lote_agr,
      sup_sig_m2: row.sup_sig_m2,
      obs: row.obs,
      nuevo: row.nuevo,
      id_parcela: row.id_parcela,
      tipo: row.tipo,
      tipo_pavim: row.tipo_pavim,
      nombre_obj: row.nombre_obj,
      sup_legal: row.sup_legal,
      zona_urban: row.zona_urban,
      cc_matriz: row.cc_matriz,
      orig_parc: row.orig_parc,
      reg_prof: row.reg_prof,
      finca: row.finca,
      colonia: row.colonia,
      matricula: row.matricula,
      parc_usrin: row.parc_usrin,
      parc_fchin: row.parc_fchin,
      parc_usrac: row.parc_usrac,
      parc_fchac: row.parc_fchac,
      tmp_shape: row.tmp_shape,
      AC_TECNICO: row.ac_tecnico,
      AC_OBS: row.ac_obs,
      AC_VERIFICADO: row.ac_verificado,
      AC_FECHA: row.ac_fecha,
      S25_INM_SUP_TE: row.s25_inm_sup_te,
      PROPIETARIO: row.propietario,
    },
    geometry: row.geometry
  }));

  return {
    type: 'FeatureCollection',
    name: 'z1_parc',
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
    features
  } as Parc;
};

export const getParc = async (): Promise<Parc> => {
  try {
    // 1. Intentar obtener del caché
    const cached = await parcelasCache.get();

    if (cached) {
      // 2. Verificar COUNT en Supabase (consulta ligera)
      const currentCount = await getParcelasCount();

      if (currentCount === cached.count) {
        return transformToGeoJSON(cached.data);
      }

    }

    // 3. Fetch completo desde Supabase
    const allData = await fetchAllParcelas();

    // 4. Guardar en caché
    await parcelasCache.set(allData, allData.length);

    // 5. Retornar GeoJSON
    return transformToGeoJSON(allData);

  } catch (error) {
    console.error('❌ Error loading parcels:', error);
    throw error;
  }
};

export const refreshParcelasCache = async (): Promise<Parc> => {
  await parcelasCache.clear();
  return await getParc();
};