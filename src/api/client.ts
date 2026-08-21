import type { ApiClaim, ApiItem, ItemStatus, NewClaim } from "../types";

export const API_URL = "http://localhost:3001";

export async function fetchItems(): Promise<ApiItem[]> {
  const response = await fetch(`${API_URL}/items`);

  if (!response.ok) {
    throw new Error("Unable to load reported items.");
  }

  return (await response.json()) as ApiItem[];
}

export async function fetchItemById(id: string): Promise<ApiItem> {
  const response = await fetch(`${API_URL}/items/${id}`);

  if (!response.ok) {
    throw new Error("The requested item could not be found.");
  }

  return (await response.json()) as ApiItem;
}

export async function fetchClaims(): Promise<ApiClaim[]> {
  const response = await fetch(`${API_URL}/claims`);

  if (!response.ok) {
    throw new Error("Unable to load claims.");
  }

  return (await response.json()) as ApiClaim[];
}

export async function createClaim(claim: NewClaim): Promise<ApiClaim> {
  const response = await fetch(`${API_URL}/claims`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(claim),
  });

  if (!response.ok) {
    throw new Error("Unable to create the claim.");
  }

  return (await response.json()) as ApiClaim;
}

export async function updateItemStatus(
  id: string,
  status: ItemStatus,
): Promise<ApiItem> {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Unable to update the item status.");
  }

  return (await response.json()) as ApiItem;
}
