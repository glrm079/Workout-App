import type { Weight } from "../../@types/index";

const weightFakeDatabase: Weight[] = [];

export const weightRepository = {
  save(weight: Weight): Weight {
    weightFakeDatabase.push(weight);
    return weight;
  },
  get(userId: string) {
    return weightFakeDatabase.filter((item) => {
      return item.userId === userId;
    });
  },
  getById(userId: string, weightId: string) {
    return weightFakeDatabase.filter((item) => {
      return item.userId === userId && item.weightId === weightId;
    });
  },
};
