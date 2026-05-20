import type { EducationProgressData } from "./educationProgress";

function apiUrl(): string {
  if (import.meta.env.PROD) return "/api/education-progress";
  return "/api/education-progress";
}

export async function fetchAccountEducationProgress(
  accessToken: string
): Promise<EducationProgressData | null> {
  const res = await fetch(apiUrl(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    progress?: EducationProgressData | null;
    error?: string;
  };
  if (!res.ok || !data.ok) {
    console.warn("[educationProgress] fetch failed", data.error || res.status);
    return null;
  }
  return data.progress ?? null;
}

export async function saveAccountEducationProgress(
  accessToken: string,
  progress: EducationProgressData
): Promise<boolean> {
  const res = await fetch(apiUrl(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ progress }),
  });
  const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!res.ok || !data.ok) {
    console.warn("[educationProgress] save failed", data.error || res.status);
    return false;
  }
  return true;
}
