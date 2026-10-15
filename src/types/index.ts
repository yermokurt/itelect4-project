export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  isActive: boolean;
}

export interface Claim {
  id: string;
  itemId: string;
  claimerUserId: string;
  claimerName: string;
  claimerEmail: string;
  ownershipDetails: string;
  dateClaimed: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  location: string;
  reportedByUserId: string;
  status: ItemStatus;
}

export enum ItemStatus {
  Lost = "LOST",
  Found = "FOUND",
  Claimed = "CLAIMED",
}

export function getLatestEntry<T>(items: T[]): T | undefined {
  return items.length > 0 ? items[items.length - 1] : undefined;
}

export function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type CreateItemDTO = Omit<Item, "id" | "reportedByUserId">;

export type ItemUpdate = Partial<Omit<Item, "id" | "reportedByUserId">>;

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export type ApiItem = Item;

export type ApiClaim = Claim;

export type NewItem = CreateItemDTO;

export type NewClaim = Omit<Claim, "id">;
