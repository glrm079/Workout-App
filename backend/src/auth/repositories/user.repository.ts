import { User } from "../../../@types";
const usersFakeDatabase: User[] = [];

export const UserRepository = {
  create(user: User): User {
    usersFakeDatabase.push(user);
    return user;
  },

  getUser(email: string, password: string): User | undefined {
    return usersFakeDatabase.find(
      (user) => user.email === email && user.password === password,
    );
  },
};
