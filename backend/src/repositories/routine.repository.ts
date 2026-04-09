import type { Routine } from "../../@types/index";

const routineFakeDatabase: Routine[] = [];

export const routineRepository = {
  save(routine: Routine): Routine {
    routineFakeDatabase.push(routine);
    return routine;
  },

  get(userId: string) {
    return routineFakeDatabase.filter((item) => {
      return item.userId === userId;
    });
  },

  getById(userId: string, routineId: string) {
    return routineFakeDatabase.filter((item) => {
      return item.userId === userId && item.routineId === routineId;
    });
  },

  delete(userId: string, routineId: string) {
    const index = routineFakeDatabase.findIndex((item) => {
      return item.userId === userId && item.routineId === routineId;
    });
    routineFakeDatabase.splice(index, 1);
  },

  update(
    userId: string,
    routineId: string,
    displayName: string,
    description: string,
    enabled: boolean,
  ) {
    const index = routineFakeDatabase.findIndex((item) => {
      return item.userId === userId && item.routineId === routineId;
    });
    routineFakeDatabase[index].displayName = displayName;
    routineFakeDatabase[index].description = description;
    routineFakeDatabase[index].enabled = enabled;
    routineFakeDatabase[index].updatedAt = Date.now();
  },
};
