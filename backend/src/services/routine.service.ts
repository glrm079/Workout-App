import { v4 as uuidv4 } from "uuid";
import { Routine } from "../../@types/index";
import { routineRepository } from "../repositories/routine.repository";

export const routinesService = {
  createRoutines(
    userId: string,
    displayName: string,
    description: string,
  ): Routine {
    const newRoutine: Routine = {
      routineId: uuidv4(),
      userId,
      displayName,
      description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      enabled: true,
    };

    return routineRepository.save(newRoutine);
  },
  getRoutines(userId: string, routineId: string) {
    if (routineId) {
      return routineRepository.getById(userId, routineId);
    }
    return routineRepository.get(userId);
  },

  deleteRoutines(userId: string, routineId: string) {
    {
      return routineRepository.delete(userId, routineId);
    }
  },

  updateRoutines(
    userId: string,
    routineId: string,
    displayName: string,
    description: string,
    enabled: boolean,
  ) {
    const routineToUpdate = routineRepository.getById(userId, routineId);

    if (!routineToUpdate) {
      throw new Error("Routine not found");
    }
    return routineRepository.update(
      userId,
      routineId,
      displayName,
      description,
      enabled,
    );
  },
};
