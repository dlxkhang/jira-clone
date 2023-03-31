export type PriorityStatus = "low" | "medium" | "high";

export type Priority = {
  id: string;
  name: PriorityStatus;
  order: number;
}
  