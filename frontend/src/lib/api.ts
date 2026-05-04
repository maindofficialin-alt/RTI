const API_BASE = "http://localhost:5000/api";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("rti_token") : null;
  const headers: Record<string, string> = { ...(options.headers as Record<string, string> || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "API Error");
  return data;
}

export function saveAuth(token: string, user: any) {
  localStorage.setItem("rti_token", token);
  localStorage.setItem("rti_user", JSON.stringify(user));
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const u = localStorage.getItem("rti_user");
  return u ? JSON.parse(u) : null;
}

export function logout() {
  localStorage.removeItem("rti_token");
  localStorage.removeItem("rti_user");
}

export function isLoggedIn() {
  return typeof window !== "undefined" && !!localStorage.getItem("rti_token");
}
