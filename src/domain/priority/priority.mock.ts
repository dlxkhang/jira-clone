import { Priority } from "./priority";

export const prioritiesMock: Priority[] = [
  {
    id: "60f1c7f0b9d3b8b2b8b2b8b2",
    name: "low",
    order: 0,
  },
  {
    id: "60f1c7f0b9d3b8b2b8b2b8b3",
    name: "medium",
    order: 1,
  },
  {
    id: "60f1c7f0b9d3b8b2b8b2b8b4",
    name: "high",
    order: 2,
  },
];

export const priorityLow = prioritiesMock[0];
export const priorityMedium = prioritiesMock[1];
export const priorityHigh = prioritiesMock[2];
