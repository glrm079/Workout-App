import { get } from "node:http";
import type { Timeline, WorkoutSet } from "../../@types/index";

const timelineFakeDatabase: Timeline[] = [];

export const timelineRepository = {
  save(timeline: Timeline): Timeline {
    timelineFakeDatabase.push(timeline);
    return timeline;
  },

  get(userId: string) {
    return timelineFakeDatabase.filter((item) => {
      return item.userId === userId;
    });
  },

  getById(userId: string, timelineId: string) {
    return timelineFakeDatabase.filter((item) => {
      return item.userId === userId && item.timelineId === timelineId;
    });
  },

  getByRoutineId(userId: string, routineId: string) {
    return timelineFakeDatabase.filter((item) => {
      return item.userId === userId && item.routineId === routineId;
    });
  },

  getByExerciseId(userId: string, exerciseId: string) {
    return timelineFakeDatabase.filter((item) => {
      return item.userId === userId && item.exerciseId === exerciseId;
    });
  },

  delete(userId: string, timelineId: string) {
    const index = timelineFakeDatabase.findIndex((item) => {
      return item.userId === userId && item.timelineId === timelineId;
    });
    timelineFakeDatabase.splice(index, 1);
  },

  update(userId: string, timelineId: string, date: string, sets: WorkoutSet[]) {
    const index = timelineFakeDatabase.findIndex((item) => {
      return item.userId === userId && item.timelineId === timelineId;
    });
    timelineFakeDatabase[index].date = date;
    timelineFakeDatabase[index].sets = sets;
    timelineFakeDatabase[index].updatedAt = Date.now();
  },
};
