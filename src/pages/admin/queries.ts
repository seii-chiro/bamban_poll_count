import type { Candidate, DashboardSummary, ERHeaderPayload, Precinct, Result, User } from "@/utils/definition";
import { BASE_URL } from "@/utils/url";

export const getERHeader = async (token: string): Promise<ERHeaderPayload> => {
    const response = await fetch(`${BASE_URL}/api/quick_count/vps_er_headers/`, {
        headers: {
        Authorization: `Token ${token}`,
        },
    });
    return response.json();
};

export const getCandidate = async (token: string): Promise<Candidate[]> => {
    const response = await fetch(`${BASE_URL}/api/quick_count/candidates/`, {
        headers: {
        Authorization: `Token ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch candidates");
    }
    return response.json();
};

export const getPollWatcher = async (token: string): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/api/user/users/`, {
        headers: {
        Authorization: `Token ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch Poll Watcher");
    }
    return response.json();
};

export const getPrecinct = async (token: string): Promise<Precinct[]> => {
    const response = await fetch(`${BASE_URL}/api/quick_count/precincts/`, {
        headers: {
        Authorization: `Token ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch Poll Watcher");
    }
    return response.json();
};

export const getDashboardSummary = async (token: string): Promise<DashboardSummary> => {
    const response = await fetch(`${BASE_URL}/api/quick_count/dashboard-summary/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch Dashboard Summary");
    }
    return response.json();
};

export const getResult = async (token: string): Promise<Result[]> => {
    const response = await fetch(`${BASE_URL}/api/quick_count/results/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch Result");
    }
    return response.json();
};
