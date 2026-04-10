import { v4 as uuidv4 } from "uuid";
import { Timeline, WorkoutSet } from "../../@types/index";
import { timelineRepository } from "../repositories/timeline.repository";

export const timelineService = {
  createTimeline(
    userId: string,
    routineId: string,
    date: string,
    sets: WorkoutSet[],
    exerciseId: string,
  ): Timeline {
    const newTimeline: Timeline = {
      timelineId: uuidv4(),
      userId,
      routineId,
      exerciseId,
      date,
      sets,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return timelineRepository.save(newTimeline);
  },
  getTimeline(
    userId: string,
    timelineId: string,
    routineId: string,
    exerciseId: string,
  ) {
    if (timelineId) {
      return timelineRepository.getById(userId, timelineId);
    }

    if (routineId) {
      return timelineRepository.getByRoutineId(userId, routineId);
    }

    if (exerciseId) {
      return timelineRepository.getByExerciseId(userId, exerciseId);
    }

    return timelineRepository.get(userId);
  },

  deleteTimeline(userId: string, timelineId: string) {
    {
      return timelineRepository.delete(userId, timelineId);
    }
  },

  updateTimeline(
    userId: string,
    timelineId: string,
    date: string,
    sets: WorkoutSet[],
  ) {
    const timelineToUpdate = timelineRepository.getById(userId, timelineId);

    if (!timelineToUpdate) {
      throw new Error("Timeline not found");
    }
    return timelineRepository.update(userId, timelineId, date, sets);
  },
};
