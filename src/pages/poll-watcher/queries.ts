import { useTokenStore } from "@/store/useTokenStore";
import type { ERHeader } from "./pages/ERHeader";
import { BASE_URL } from "@/utils/url";
import type { ERResult } from "./pages/MayorViceMayor";

export const postERHeader = async (formData: ERHeader) => {
  const token = useTokenStore.getState().token;

  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${BASE_URL}/api/quick_count/vps_er_headers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return response.json();
};

export const postERResult = async (formData: ERResult) => {
  const token = useTokenStore.getState().token;

  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${BASE_URL}/api/quick_count/vps_er_results/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return response.json();
};

export const getCandidates = async (): Promise<Candidate[]> => {
  const token = useTokenStore.getState().token;

  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${BASE_URL}/api/quick_count/candidates/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  const data = await response.json();
  return data as Candidate[];
};
