import parcData from '@data/map/z1_const_full.json'; 
import type { Const } from "../components/const.interface";

export const getConsts = async (): Promise<Const> => {
  return parcData as Const;
};