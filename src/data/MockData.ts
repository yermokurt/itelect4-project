import { Item, ItemStatus } from '../types/index';

export const mockItems: Item[] = [
  {
    id: 101,
    title: "Student ID",
    description: "Found near library main door.",
    location: "Library",
    reportedByUserId: 1,
    status: ItemStatus.Lost,
  },
  {
    id: 102,
    title: "Wireless Earbuds",
    description: "Left at the table on the student center.",
    location: "Student Center",
    reportedByUserId: 2,
    status: ItemStatus.Found,
  },
  {
    id: 103,
    title: "Tumbler",
    description: "Returned to owner after verification.",
    location: "Sports Complex",
    reportedByUserId: 3,
    status: ItemStatus.Claimed,
  },
];