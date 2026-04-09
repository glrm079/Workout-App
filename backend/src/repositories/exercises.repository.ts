import { Exercise } from "../../@types/index";

const exercisesFakeDatabase: Exercise[] = [];

export const exerciseRepository = {
  save(exercise: Exercise): Exercise {
    exercisesFakeDatabase.push(exercise);
    return exercise;
  },

  get(userId: string) {
    return exercisesFakeDatabase.filter((item) => {
      return item.userId === userId;
    });
  },

  getById(userId: string, exerciseId: string) {
    return exercisesFakeDatabase.filter((item) => {
      return item.userId === userId && item.exerciseId === exerciseId;
    });
  },

  getByRoutineId(userId: string, routineId: string) {
    return exercisesFakeDatabase.filter((item) => {
      return item.userId === userId && item.routineIds.includes(routineId);
    });
  },

  getByCategoryId(userId: string, categoryId: string) {
    return exercisesFakeDatabase.filter((item) => {
      return item.userId === userId && item.categoryIds.includes(categoryId);
    });
  },

  delete(userId: string, exerciseId: string) {
    const index = exercisesFakeDatabase.findIndex((item) => {
      return item.userId === userId && item.exerciseId === exerciseId;
    });
    exercisesFakeDatabase.splice(index, 1);
  },

  update(
    userId: string,
    exerciseId: string,
    displayName: string,
    description: string,
    routineIds: string[],
    categoryIds: string[],
  ) {
    const index = exercisesFakeDatabase.findIndex((item) => {
      return item.userId === userId && item.exerciseId === exerciseId;
    });
    exercisesFakeDatabase[index].displayName = displayName;
    exercisesFakeDatabase[index].description = description;
    exercisesFakeDatabase[index].routineIds = routineIds;
    exercisesFakeDatabase[index].updatedAt = Date.now();
    exercisesFakeDatabase[index].categoryIds = categoryIds;
    return exercisesFakeDatabase[index];
  },
};
