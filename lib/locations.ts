import { apiFetch } from "./api";

export type City = {
  id: number;
  name: string;
};

export type District = {
  id: number;
  city_id: number;
  name: string;
};

export async function getCities() {
  return apiFetch<{ data: City[] }>("/locations/cities", {
    auth: false,
  });
}

export async function getDistricts(cityId: number | string) {
  return apiFetch<{ data: District[] }>(
    `/locations/cities/${cityId}/districts`,
    {
      auth: false,
    }
  );
}