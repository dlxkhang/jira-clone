export type PriorityStatus = "low" | "medium" | "high";
export type PriorityId = number;
export type Priority = {
  id: PriorityId;
  name: PriorityStatus;
  order: number;
};
  