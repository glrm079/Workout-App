import { v4 as uuidv4 } from "uuid";
import { Weight } from "../../@types/index";
import { weightRepository } from "../repositories/weight.repository";

export const weightService = {
  createWeight(userId: string, weight: number, date: string): Weight {
    const newWeight: Weight = {
      weightId: uuidv4(),
      userId,
      weight,
      date,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return weightRepository.save(newWeight);
  },
  getWeight(userId: string, weightId: string) {
    if (weightId) {
      return weightRepository.getById(userId, weightId);
    }
    return weightRepository.get(userId);
  },

  deleteWeight(userId: string, weightId: string) {
    {
      return weightRepository.delete(userId, weightId);
    }
  },

  updateWeight(userId: string, weightId: string, weight: number, date: string) {
    const weightToUpdate = weightRepository.getById(userId, weightId);

    if (!weightToUpdate) {
      throw new Error("Weight not found");
    }
    return weightRepository.update(userId, weightId, weight, date);
  },
};
