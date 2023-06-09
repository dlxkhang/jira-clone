import { userMock1, usersMock } from "@domain/user";
import { Comment } from "./comment";

const createdAt = Date.now();
const updatedAt = Date.now();

export const commentMock1: Comment = {
  id: "61f4d3fca5c18e5d870f5eee",
  user: usersMock[3], // Jessie
  message:
    "Depending on the user, some features are restricted. For example, only the reporter of an issue can edit the title and description.",
  createdAt,
  updatedAt,
};

export const commentMock2: Comment = {
  id: "60f1c7f0b9d3b8b2b8b2b82f",
  user: usersMock[7], // Little Green Men
  message: "And only the original poster of a comment can edit or delete it!",
  createdAt,
  updatedAt,
};

export const commentMock3: Comment = {
  id: "60f1c7f0b9d3b8b2b8b2b8ab",
  user: usersMock[5], // Mr. Potato
  message:
    "This is not they only accessible feature implemented. By using Radix UI, components like select, dialog or checkboxes are accessible by default, and you can handle them with the keyboard.",
  createdAt,
  updatedAt,
};

export const commentMock4: Comment = {
  id: "60f1c7f0b9d3b8b2b8b2b82f",
  user: userMock1, // Daniel Serrano
  message:
    "By the way, the 404 error will be triggered if you modify the URL to any non existing path.",
  createdAt,
  updatedAt,
};

export const commentMock5: Comment = {
  id: "60f1c7f0b9d3b8b2b8b2b8aa",
  user: usersMock[6], // Ms. Potato
  message:
    "By the way, the 404 error will be triggered if you modify the URL to any non existing path.",
  createdAt,
  updatedAt,
};
