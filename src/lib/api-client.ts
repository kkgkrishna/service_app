import { toast } from "react-hot-toast";

interface FetchOptions extends RequestInit {
  showSuccessToast?: boolean;
  successMessage?: string;
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { showSuccessToast = false, successMessage, ...fetchOptions } = options;

  try {
    const response = await fetch(`/api${endpoint}`, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    if (showSuccessToast) {
      toast.success(successMessage || "Operation successful");
    }

    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    toast.error(message);
    throw error;
  }
}
