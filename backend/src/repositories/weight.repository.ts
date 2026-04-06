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
  delete(userId: string, weightId: string) {
    const index = weightFakeDatabase.findIndex((item) => {
      return item.userId === userId && item.weightId === weightId;
    });
    weightFakeDatabase.splice(index, 1);
  },

  update(userId: string, weightId: string, weight: number, date: string) {
    const index = weightFakeDatabase.findIndex((item) => {
      return item.userId === userId && item.weightId === weightId;
    });
    weightFakeDatabase[index].weight = weight;
    weightFakeDatabase[index].date = date;
    weightFakeDatabase[index].updatedAt = Date.now();
  },
};
