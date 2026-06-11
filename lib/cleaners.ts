import { apiFetch } from "./api";

export type Cleaner = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  city_id: number | null;
  district_id: number | null;
  city: {
    id: number;
    name: string;
  } | null;
  district: {
    id: number;
    name: string;
  } | null;
  cleaner_profile: {
    services: string[];
    experience: string | null;
    daily_price: string | null;
    description: string | null;
    is_verified: boolean;
    is_visible: boolean;
  } | null;
};

export type CleanerFilters = {
  city_id?: string;
  district_id?: string;
};

export async function getCleaners(filters: CleanerFilters = {}) {
  const params = new URLSearchParams();

  if (filters.city_id) {
    params.set("city_id", filters.city_id);
  }

  if (filters.district_id) {
    params.set("district_id", filters.district_id);
  }

  const query = params.toString();

  return apiFetch<{
    data: Cleaner[];
  }>(`/cleaners${query ? `?${query}` : ""}`, {
    auth: false,
  });
}