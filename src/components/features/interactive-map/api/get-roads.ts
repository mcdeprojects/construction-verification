import type { GeoJsonData } from "../components";
import roadsData from '@data/roads-wgs84.json';

export const getRoads = async (): Promise<GeoJsonData> => {
  return new Promise(resolve => resolve(roadsData as GeoJsonData));
};
