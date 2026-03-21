import { Weight } from "../@types/index";

const weightFakeDatabase: Weight[] = [];

export const weightRepository = {
  save(weight: Weight): Weight {
    weightFakeDatabase.push(weight);
    return weight;
  },
};
