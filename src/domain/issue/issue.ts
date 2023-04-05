import { User } from "../user";
import { CategoryType } from "@domain/category";
import { Comment } from "../comment";
import { Priority } from "../priority";

export type IssueId = number;
export interface Issue {
  id: IssueId;
  name: string;
  description?: string;
  categoryType?: CategoryType;
  reporter: User;
  asignee: User;
  comments: Comment[];
  priority: Priority;
  createdAt: number;
  updatedAt: number;
}
