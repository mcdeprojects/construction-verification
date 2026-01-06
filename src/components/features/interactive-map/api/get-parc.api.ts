import type { Parc } from "../components";
import parcData from '@data/map/z1_parc.json';

export const getParc = async (): Promise<Parc> => {
  return new Promise(resolve => resolve(parcData as Parc));
};
