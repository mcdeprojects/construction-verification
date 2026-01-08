
import type { FeatureCollection, Feature, Polygon, MultiPolygon } from 'geojson';

export interface FeatureProperties {
  fid: number
  SUP_CONS?: number
  CATEGORIA?: string
  USO?: string
}

export type ConstFeature = Feature<Polygon | MultiPolygon, FeatureProperties>;

export type Const = FeatureCollection<Polygon | MultiPolygon, FeatureProperties>;