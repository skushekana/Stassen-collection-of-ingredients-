import { CulinaryMasterclass } from '../../types';
import { RECIPES_1_TO_10 } from './recipes1to10';
import { RECIPES_11_TO_20 } from './recipes11to20';
import { RECIPES_21_TO_30 } from './recipes21to30';
import { RECIPES_31_TO_40 } from './recipes31to40';
import { RECIPES_41_TO_50 } from './recipes41to50';

export const ALL_50_WORLD_RECIPES: CulinaryMasterclass[] = [
  ...RECIPES_1_TO_10,
  ...RECIPES_11_TO_20,
  ...RECIPES_21_TO_30,
  ...RECIPES_31_TO_40,
  ...RECIPES_41_TO_50
];

export {
  RECIPES_1_TO_10,
  RECIPES_11_TO_20,
  RECIPES_21_TO_30,
  RECIPES_31_TO_40,
  RECIPES_41_TO_50
};
