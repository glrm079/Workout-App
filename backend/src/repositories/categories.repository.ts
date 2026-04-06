import type { Categories, Weight } from "../../@types/index";

const categoriesFakeDatabase: Categories[] = [];

export const categoriesRepository = {
  save(category: Categories): Categories {
    categoriesFakeDatabase.push(category);
    return category;
  },

  get(userId: string) {
    return categoriesFakeDatabase.filter((item) => {
      return item.userId === userId;
    });
  },

  getById(userId: string, categoryId: string) {
    return categoriesFakeDatabase.filter((item) => {
      return item.userId === userId && item.categoryId === categoryId;
    });
  },

  delete(userId: string, categoryId: string) {
    const index = categoriesFakeDatabase.findIndex((item) => {
      return item.userId === userId && item.categoryId === categoryId;
    });
    categoriesFakeDatabase.splice(index, 1);
  },

  update(
    userId: string,
    categoryId: string,
    displayName: string,
    color: string,
  ) {
    const index = categoriesFakeDatabase.findIndex((item) => {
      return item.userId === userId && item.categoryId === categoryId;
    });
    categoriesFakeDatabase[index].displayName = displayName;
    categoriesFakeDatabase[index].color = color;
    categoriesFakeDatabase[index].updatedAt = Date.now();
  },
};
