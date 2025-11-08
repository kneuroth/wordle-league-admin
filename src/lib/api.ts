import { getApiBase } from '@/lib/env';
import type { Score } from '@/models/Score';

async function requestJson(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  // try parse json if present
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export async function getScores(): Promise<Score[]> {
  const base = getApiBase();
  const url = `${base}/scores`;
  return (await requestJson(url)) as Score[];
}

export async function addScore(payload: Record<string, any>): Promise<any> {
  const base = getApiBase();
  const url = `${base}/score`;
  return await requestJson(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function deleteScore(playerId: string, chat_Id: string, date: string): Promise<void> {
  const base = getApiBase();
  const url = `${base}/score?player_id=${encodeURIComponent(playerId)}&chat_id=${encodeURIComponent(chat_Id)}&date=${encodeURIComponent(date)}`;
  // Use requestJson for consistent error handling; ignore any response body
  await requestJson(url, { method: 'DELETE' });
}