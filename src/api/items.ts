import { request } from "./client";
import type { Item, CreateItemDTO, ItemUpdate, ItemStatus } from "../types";

export async function fetchItems(token: string): Promise<Item[]> {
  return request<Item[]>("/api/items", { token });
}

export async function fetchItemById(id: string, token: string): Promise<Item> {
  return request<Item>(`/api/items/${id}`, { token });
}

export async function createItem(data: CreateItemDTO, token: string): Promise<Item> {
  return request<Item>("/api/items", {
    method: "POST",
    token,
    body: data,
  });
}

export async function updateItem(id: string, data: ItemUpdate, token: string): Promise<Item> {
  return request<Item>(`/api/items/${id}`, {
    method: "PATCH",
    token,
    body: data,
  });
}

export async function updateItemStatus(id: string, status: ItemStatus, token: string): Promise<Item> {
  return updateItem(id, { status }, token);
}

export async function deleteItem(id: string, token: string): Promise<void> {
  return request<void>(`/api/items/${id}`, {
    method: "DELETE",
    token,
  });
}
