import { request, setAccessToken, refreshSekali } from "./client";
import { ApiError } from "./errors";
import type {
  LoginResponse,
  PesertaResponse,
} from "./types";

// Login dan menyimpan access token
export async function login(email: string, password: string) {
  const body = await request<LoginResponse>(
    "POST",
    "/auth/login",
    { body: { email, password } }
  );

  setAccessToken(body.data.accessToken);

  return body.data.peserta;
}

// Mengambil profil peserta menggunakan access token
export async function ambilProfil() {
  const body = await request<PesertaResponse>(
    "GET",
    "/me"
  );

  return body.data;
}

// Memulihkan sesi menggunakan refresh cookie
export async function pulihkanSesi() {
  try {
    await refreshSekali();
    return await ambilProfil();
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      setAccessToken(null);
      return null;
    }

    throw err;
  }
}

// Logout dan menghapus access token
export async function logout(): Promise<void> {
  try {
    await request<void>("POST", "/auth/logout");
  } finally {
    setAccessToken(null);
  }
}
