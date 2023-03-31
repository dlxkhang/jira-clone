import { userMock1, userMock2, usersMock } from "@domain/user";
import {
  commentMock1,
  commentMock2,
  commentMock3,
  commentMock4,
  commentMock5,
} from "@domain/comment";
import { priorityLow, priorityMedium, priorityHigh } from "@domain/priority";
import { Issue } from "./issue";

const createdAt = new Date("2022-01-18 11:00").valueOf();

// PROJECT 1
export const todoIssuesMock1: Issue[] = [];

export const inProgressIssuesMock1: Issue[] = [
  {
    id: "61f4d3fca5c18e5d870f5b5d",
    name: "HINT: Open two tabs to see events in real time.",
    description:
      "With the same project open in two different tabs, try making some changes on one of them. The result will be reflected instantly on the other. This will happen with every other user with the app open.",
    reporter: userMock1, // Daniel Serrano
    asignee: userMock2, // Woody
    comments: [],
    priority: priorityHigh,
    categoryType: "TODO",
    createdAt,
    updatedAt: createdAt,
  },
  {
    id: "61f4d3fca5c18e5d870f5b5f",
    name: "HINT: Try to login and interact with different users. ",
    description:
      "This will be reflected on the UI (e. g. which user created and issue or wrote a comment). A user can only see the projects they are assigned to. You can try this by creating a new project at the /projects page. To logout, go to the avatar dropdown (top right).",
    reporter: userMock2, // Woody
    asignee: usersMock[2], // Buzz Lightyear
    comments: [commentMock1, commentMock2],
    priority: priorityHigh,
    categoryType: "TODO",
    createdAt,
    updatedAt: new Date("2022-01-23 17:50").valueOf(),
  },
];

export const doneIssuesMock1: Issue[] = [
];

// PROJECT 2
export const todoIssuesMock2: Issue[] = [
  {
    id: "f61f4d3fca5c18e5d870f53e",
    name: "Add and display issue timestamps",
    description:
      "Id should be create automatically on new Issue(). It must be displayed on issue panel, as well as an updatedAt parameter",
    reporter: userMock1,
    asignee: userMock2,
    comments: [],
    priority: priorityMedium,
    categoryType: "TODO",
    createdAt,
    updatedAt: new Date("2022-01-18 11:01").valueOf(),
  },
  {
    id: "61f4d3fca5c18e5d870f53e2",
    name: "Add projects section and the ability to create multiple projects",
    description:
      "Router would be needed. Can create and edit project, as well as add users to that particular project",
    reporter: userMock1,
    asignee: userMock1,
    comments: [],
    priority: priorityLow,
    categoryType: "TODO",
    createdAt,
    updatedAt: new Date("2022-01-23 14:28").valueOf(),
  },
];

export const inProgressIssuesMock2: Issue[] = [
  {
    id: "81261f4d3fca5c18e5d870f5",
    name: "Add dark mode",
    description: "",
    reporter: userMock1,
    asignee: userMock1,
    comments: [],
    priority: priorityHigh,
    categoryType: "IN_PROGRESS",
    createdAt,
    updatedAt: createdAt,
  },
];

export const doneIssuesMock2: Issue[] = [];

export const defaultIssuesIds = [
  todoIssuesMock1,
  inProgressIssuesMock1,
  doneIssuesMock1,
  todoIssuesMock2,
  inProgressIssuesMock2,
  doneIssuesMock2,
]
  .flat()
  .map((issue) => issue.id);
