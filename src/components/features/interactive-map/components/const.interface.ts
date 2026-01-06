
import type { FeatureCollection, Feature, Polygon, MultiPolygon } from 'geojson';

export interface FeatureProperties {
  fid: number
  TECNICO: string
  OBS: any
  VERIFICADO: string
  FECHA: string
  SUP_CONS: number
  PISOS: number
  PAVIMENTO: string
  CATEGORIA: string
  SUP_CUBIERTA: number
  ORIENTACION: string
  USO: string
}

export type ConstFeature = Feature<Polygon | MultiPolygon, FeatureProperties>;

export type Const = FeatureCollection<Polygon | MultiPolygon, FeatureProperties>;