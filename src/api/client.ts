
import { ApiError, bacaErrorBody } from "./errors";
import { BASE_URL } from "../config";
import type { RefreshResponse } from "./types";

type Metode = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type NilaiQuery = string | number | boolean | undefined;

interface OpsiRequest {
  body?: unknown;
  query?: Record<string, NilaiQuery>;
  signal?: AbortSignal;
}

const LINTAS_ORIGIN = BASE_URL.startsWith("http");

let accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

// Handler untuk memberi tahu AuthProvider jika sesi berakhir
let sesiBerakhirHandler: (() => void) | null = null;

export function setSesiBerakhirHandler(
  handler: (() => void) | null
): void {
  sesiBerakhirHandler = handler;
}

export function beritahuSesiBerakhir(): void {
  sesiBerakhirHandler?.();
}

function buatUrl(
  path: string,
  query?: Record<string, NilaiQuery>
): string {
  const url = new URL(BASE_URL + path, window.location.origin);

  for (const [kunci, nilai] of Object.entries(query ?? {})) {
    if (nilai !== undefined) {
      url.searchParams.set(kunci, String(nilai));
    }
  }

  return url.toString();
}

export async function request<T>(
  metode: Metode,
  path: string,
  opsi: OpsiRequest = {}
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (opsi.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (accessToken !== null) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let res: Response;

  try {
    res = await fetch(buatUrl(path, opsi.query), {
      method: metode,
      headers,
      body:
        opsi.body !== undefined
          ? JSON.stringify(opsi.body)
          : undefined,
      signal: opsi.signal,
      credentials: LINTAS_ORIGIN ? "include" : "same-origin",
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw err;
    }

    throw new ApiError(
      "Tidak dapat terhubung ke server",
      0,
      "NETWORK_ERROR"
    );
  }

  const requestId = res.headers.get("X-Request-Id") ?? undefined;
  const teks = await res.text();

  let json: unknown = null;

  if (teks !== "") {
    try {
      json = JSON.parse(teks);
    } catch {
      json = null;
    }
  }

  if (!res.ok) {
    const info = bacaErrorBody(json);

    throw new ApiError(
      info?.pesan ?? "Respons server tidak dikenali",
      res.status,
      info?.kode ?? "BAD_RESPONSE",
      info?.detail ?? [],
      info?.requestId ?? requestId
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  if (json === null) {
    throw new ApiError(
      "Server tidak mengirim JSON yang valid",
      res.status,
      "BAD_RESPONSE",
      [],
      requestId
    );
  }

  return json as T;
}

// Meminta access token baru menggunakan cookie refreshToken
export async function refreshSekali(): Promise<string> {
  const body = await request<RefreshResponse>(
    "POST",
    "/auth/refresh"
  );

  setAccessToken(body.data.accessToken);

  return body.data.accessToken;
}
