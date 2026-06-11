import { apiFetch } from "./api";

export type JobRequest = {
  id: number;
  title: string;
  service_type: string;
  city_id: number;
  district_id: number;
  city: {
    id: number;
    name: string;
  } | null;
  district: {
    id: number;
    name: string;
  } | null;
  address_detail: string | null;
  work_date: string | null;
  work_time: string | null;
  description: string | null;
  budget: string | null;
  status: string;
  customer?: {
    id: number;
    name: string;
    phone: string;
    email: string;
  } | null;
  created_at: string | null;
};

export type StoreJobRequestPayload = {
  title: string;
  service_type: string;
  city_id: number;
  district_id: number;
  address_detail?: string;
  work_date?: string;
  work_time?: string;
  description?: string;
  budget?: string;
};

export type JobRequestFilters = {
  city_id?: string;
  district_id?: string;
};

export async function createJobRequest(payload: StoreJobRequestPayload) {
  return apiFetch<{
    message: string;
    data: JobRequest;
  }>("/job-requests", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMyJobRequests() {
  return apiFetch<{
    data: JobRequest[];
  }>("/my-job-requests");
}

export async function getOpenJobRequests(filters: JobRequestFilters = {}) {
  const params = new URLSearchParams();

  if (filters.city_id) {
    params.set("city_id", filters.city_id);
  }

  if (filters.district_id) {
    params.set("district_id", filters.district_id);
  }

  const query = params.toString();

  return apiFetch<{
    data: JobRequest[];
  }>(`/job-requests${query ? `?${query}` : ""}`);
}