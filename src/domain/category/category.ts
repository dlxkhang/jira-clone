import { Issue } from "@domain/issue";

export type CategoryId = string;
export type CategoryType = typeof categoryTypes[number];
export const categoryTypes = ["TODO", "IN_PROGRESS", "READYFORREVIEW", "REVIEW", "DONE"] as const;

export const categoryTypeDict: Record<CategoryType, string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  READYFORREVIEW: "Ready for review",
  REVIEW: "Review",
  DONE: "Done",
};

export interface Category {
  id: CategoryId;
  type: CategoryType;
  name: string;
  issues: Issue[];
  order: number;
  createdAt?: number;
  updatedAt?: number;
}
