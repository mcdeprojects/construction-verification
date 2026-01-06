export interface Parc {
  type: string
  name: string
  crs: Crs
  features: Feature[]
}

export interface Crs {
  type: string
  properties: Properties
}

export interface Properties {
  name: string
}

export interface Feature {
  type: string
  properties: FeatureProperties
  geometry: Geometry
}

export interface FeatureProperties {
  fid: number
  objectid: number
  dpto: string
  dist: number
  padron: number
  zona: number
  mz: number
  lote: number
  ccatastral: string
  t_mesa?: number
  EXP?: number
  gest?: number
  mz_agr?: string
  lote_agr?: string
  sup_sig_m2?: number
  obs?: string
  nuevo: number
  id_parcela?: number
  tipo?: number
  tipo_pavim: any
  nombre_obj?: string
  sup_legal?: number
  zona_urban?: number
  cc_matriz?: string
  orig_parc: any
  reg_prof?: string
  finca?: string
  colonia?: string
  matricula?: string
  parc_usrin?: string
  parc_fchin?: string
  parc_usrac?: string
  parc_fchac?: string
  tmp_shape?: string
  AC_TECNICO?: string
  AC_OBS?: string
  AC_VERIFICADO?: string
  AC_FECHA: any
  S25_INM_SUP_TE?: number
}

export interface Geometry {
  type: string
  coordinates: number[][][][]
}
