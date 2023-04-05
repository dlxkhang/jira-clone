import { Priority } from "./priority";

export const prioritiesMock: Priority[] = [
  {
    id: 1,
    name: "low",
    order: 0,
  },
  {
    id: 2,
    name: "medium",
    order: 1,
  },
  {
    id: 3,
    name: "high",
    order: 2,
  },
];

export const priorityLow = prioritiesMock[0];
export const priorityMedium = prioritiesMock[1];
export const priorityHigh = prioritiesMock[2];
