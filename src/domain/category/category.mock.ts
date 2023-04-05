import { Category, categoryTypes, categoryTypeDict } from "@domain/category";
import {
  todoIssuesMock1,
  inProgressIssuesMock1,
  doneIssuesMock1,
  todoIssuesMock2,
  inProgressIssuesMock2,
  doneIssuesMock2,
} from "@domain/issue";

const createdAt = new Date("2022-01-01").valueOf();
const updatedAt = new Date("2022-01-01").valueOf();

const ids1 = [
  "60f1c7f0b9d3b8b2b8b2b823",
  "4660f1c7f0b9d3b8b2b8b2b8",
  "4660f1c7f0b9d3b8b2b88888",
  "4660f1c7f0b9d3b8b2b88222",
  "4660f1c7f0b9d3b8b2b88333",
];
const issuesMock1 = [todoIssuesMock1, inProgressIssuesMock1, doneIssuesMock1];

const ids2 = [
  "660f1c7f0b9d3b8b2b8b2b8e2",
  "a660f1c7f0b9d3b8b2b8b2b81",
  "a660f1c7f0b9d3b8b2b8b2b88",
  "a660f1c7f0b9d3b8b2b8b2b8b",
  "a660f1c7f0b9d3b8b2b8b2b8f",
];
const issuesMock2 = [todoIssuesMock2, inProgressIssuesMock2, doneIssuesMock2];

export const categoriesMock1: Category[] = categoryTypes.map((categoryType, index) => {
  const name = categoryTypeDict[categoryType];
  const type = categoryType;
  const order = index;
  const issues = issuesMock1[index] ?? [];

  return {
    name,
    issues,
    type,
    order,
    createdAt,
    updatedAt,
  };
});

export const categoriesMock2: Category[] = categoryTypes.map((categoryType, index) => {
  const name = categoryTypeDict[categoryType];
  const type = categoryType;
  const order = index;
  const issues = issuesMock2[index] ?? [];

  return {
    name,
    type,
    issues,
    order,
    createdAt,
    updatedAt,
  };
});
