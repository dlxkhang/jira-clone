import { User } from "../user";

export type CommentId = number;
export interface Comment {
  id: CommentId;
  user: User;
  message: string;
  createdAt: number;
  updatedAt: number;
}
