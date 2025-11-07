export const apiClient = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
  options: RequestInit = {}
): Promise<T> => {
  const isFormData = options.body instanceof FormData;

  const config: RequestInit = {
    method,
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    config
  );
  // console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  const text = await response.text();
  // console.log("Response:", text);

  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let message = text;
    if (contentType?.includes("application/json")) {
      try {
        const json = JSON.parse(text);
        message = json?.message || JSON.stringify(json);
      } catch (_) {}
    }
    throw new Error(message);
  }

  if (contentType?.includes("application/json")) {
    return JSON.parse(text) as T;
  }

  return text as unknown as T;
};
