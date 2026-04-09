import { v4 as uuidv4 } from "uuid";
import { Exercise } from "../../@types/index";
import { exerciseRepository } from "../repositories/exercises.repository";

export const exerciseService = {
  createExercise(
    userId: string,
    displayName: string,
    description: string,
    routineIds: string[],
    categoryIds: string[],
  ): Exercise {
    const newExercise: Exercise = {
      exerciseId: uuidv4(),
      userId,
      displayName,
      description,
      routineIds,
      categoryIds,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return exerciseRepository.save(newExercise);
  },
  getExercises(
    userId: string,
    exerciseId: string,
    routineId: string,
    categoryId: string,
  ) {
    if (exerciseId) {
      return exerciseRepository.getById(userId, exerciseId);
    }

    if (categoryId) {
      return exerciseRepository.getByCategoryId(userId, categoryId);
    }

    if (routineId) {
      return exerciseRepository.getByRoutineId(userId, routineId);
    }

    return exerciseRepository.get(userId);
  },

  deleteExercises(userId: string, exerciseId: string) {
    {
      return exerciseRepository.delete(userId, exerciseId);
    }
  },

  updateExercises(
    userId: string,
    exerciseId: string,
    displayName: string,
    description: string,
    routineIds: string[],
    categoryIds: string[],
  ) {
    const exerciseToUpdate = exerciseRepository.getById(userId, exerciseId);

    if (!exerciseToUpdate) {
      throw new Error("Exercise not found");
    }
    return exerciseRepository.update(
      userId,
      exerciseId,
      displayName,
      description,
      routineIds,
      categoryIds,
    );
  },
};
