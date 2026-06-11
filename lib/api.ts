const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://service.benimelemanim.com/api/v1";

type ApiError = {
  message?: string;
  errors?: Record<string, string[]>;
};

type ApiFetchOptions = RequestInit & {
  auth?: boolean;
};

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { auth = true, ...fetchOptions } = options;

  const token =
    auth && typeof window !== "undefined"
      ? localStorage.getItem("auth_token")
      : null;

  const hasBody = !!fetchOptions.body;

  const headers: HeadersInit = {
    Accept: "application/json",
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(fetchOptions.headers || {}),
  };

  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers,
    });
  } catch {
    throw {
      status: 0,
      message:
        "Sunucuya ulaşılamadı. API adresi, CORS veya güvenlik ayarlarını kontrol edin.",
      errors: {},
    };
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = data as ApiError | null;

    throw {
      status: response.status,
      message: error?.message || "API isteği başarısız oldu.",
      errors: error?.errors || {},
    };
  }

  return data as T;
}