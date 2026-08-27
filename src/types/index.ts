// Reference is from Session 1 (July 4, 2026)
// Types for the App Project (Campus Lost and Found)

export interface User {
    id: number;
    name: string;
    email: string;
    role: "student" | "admin";
    isActive: boolean;
}

export interface Claim {
    id: number;
    itemId: number;
    claimerUserId: number;
    claimerName: string;
    claimerEmail: string;
    ownershipDetails: string;
    dateClaimed: string;
}

export interface Item {
    id: number;
    title: string;
    description: string;
    location: string;
    reportedByUserId: number;
    status: ItemStatus;
}

// Session 2 (July 11, 2026)
// Enums and Utility Types

// 1. ENUM
export enum ItemStatus {
    Lost = "LOST",
    Found = "FOUND",
    Claimed = "CLAIMED"
}

// 2. GENERIC FUNCTION
export function getLatestEntry<T>(items: T[]): T | undefined {
    return items.length > 0 ? items[items.length - 1] : undefined;
}


//CONSTRAINED GENERIC FUNCTION
export function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}

// GENERIC INTERFACE
export interface ApiResponse<T> {
  success: boolean;
  data:    T;
  message?: string;
}


// 3. UTILITY TYPES

// Omit: For new item
export type CreateItemDTO = Omit<Item, "id">;

// Partial: for updates
export type ItemUpdate = Partial<Item>;

// Session 7: JSON Server returns generated item IDs as strings.
export type ApiItem = Omit<Item, "id"> & { id: string };

export type NewItem = Omit<ApiItem, "id">;

export type ApiClaim = Omit<Claim, "id" | "itemId"> & {
  id: string;
  itemId: string;
};

export type NewClaim = Omit<ApiClaim, "id">;



