import { request } from "./client";
import type { RegisterRequest, LoginRequest, LoginResponse, User } from "../types";

export async function register(data: RegisterRequest): Promise<User> {
  return request<User>("/api/auth/register", {
    method: "POST",
    body: data,
  });
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return request<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: data,
  });
}
