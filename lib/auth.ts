export type AuthUser = {
  id: number;
  role: "customer" | "cleaner" | "admin";
  name: string;
  email: string;
  phone: string | null;
  city_id: number | null;
  district_id: number | null;
  city?: {
    id: number;
    name: string;
  } | null;
  district?: {
    id: number;
    name: string;
  } | null;
  is_active: boolean;
  cleaner_profile?: {
    services: string[];
    experience: string | null;
    daily_price: string | null;
    description: string | null;
    is_verified: boolean;
    is_visible: boolean;
  } | null;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: AuthUser;
};

function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth_changed"));
  }
}

export function saveAuth(token: string, user: AuthUser) {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
  notifyAuthChanged();
}

export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("auth_user");

  if (!user) return null;

  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
  notifyAuthChanged();
}