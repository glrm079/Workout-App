import { v4 as uuidv4 } from "uuid";
import { Weight } from "../@types/index";
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
};
