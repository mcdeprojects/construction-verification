export interface ParcelRow {
  id: number;
  ccatastral: string;
  objectid: number | null;
  dpto: string | null;
  dist: number | null;
  padron: number | null;
  zona: number | null;
  mz: number | null;
  lote: number | null;
  t_mesa: number | null;
  exp: number | null;
  gest: number | null;
  mz_agr: string | null;
  lote_agr: string | null;
  sup_sig_m2: number | null;
  obs: string | null;
  nuevo: number | null;
  id_parcela: number | null;
  tipo: number | null;
  tipo_pavim: string | null;
  nombre_obj: string | null;
  sup_legal: number | null;
  zona_urban: number | null;
  cc_matriz: string | null;
  orig_parc: string | null;
  reg_prof: string | null;
  finca: string | null;
  colonia: string | null;
  matricula: string | null;
  parc_usrin: string | null;
  parc_fchin: string | null;
  parc_usrac: string | null;
  parc_fchac: string | null;
  tmp_shape: string | null;
  ac_tecnico: string | null;
  ac_obs: string | null;
  ac_verificado: string | null;
  ac_fecha: string | null;
  s25_inm_sup_te: number | null;
  geometry: string | null; // PostGIS geometry as text
  created_at: string;
  updated_at: string;
}

export interface NotificationRow {
  id: number;
  ccatastral: string;
  notified_at: string;
  notified_by: string | null;
  observations: string | null;
  cuenta_catastral: string | null;
  status: 'notified' | 'pending' | 'verified';
  created_at: string;
  updated_at: string;
}