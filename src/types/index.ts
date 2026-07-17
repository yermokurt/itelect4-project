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

// 3. UTILITY TYPES

// Omit: For new item
export type CreateItemDTO = Omit<Item, "id">;

// Partial: for updates
export type ItemUpdate = Partial<Item>;