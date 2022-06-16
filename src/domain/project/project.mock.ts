import { Project, createProject } from "./project";
import { userMock1, userMock2, userMock3 } from "domain/user";
import { createCategory, categoriesMock } from "domain/category";

export const projectMock: Project = createProject({
  id: 1,
  name: "JIRA Clone project",
  users: [userMock1, userMock2, userMock3],
  categories: categoriesMock.map(createCategory),
});