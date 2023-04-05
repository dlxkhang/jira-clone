import { User, UserId, getRandomPastelColor } from "@domain/user";
import { Prisma } from "@prisma/client";
import { dnull } from "src/utils/dnull";
import { db } from "./db.server";

export const getUser = async (userId: UserId): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: { id: userId },
  });
  return user ? dnull(user) : null;
};

export const getUsers = async (): Promise<User[]> => {
  const users = await db.user.findMany({
    orderBy: { firstName: "asc" },
  });
  return users.map(dnull);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: { email },
  });
  return user ? dnull(user) : null;
};

export const createUser = async (userCreateInput: Prisma.UserCreateInput): Promise<User> => {
  const newUser = await db.user.create({
    data: {
      ...userCreateInput,
      color: userCreateInput.color || getRandomPastelColor(),
    },
  });
  return dnull(newUser);
};
