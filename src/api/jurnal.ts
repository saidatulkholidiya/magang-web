import { request } from "./client";
import type { JurnalBaru, JurnalListResponse, JurnalResponse } from "./types";

interface OpsiDaftar {
  halaman?: number;
  signal?: AbortSignal;
}

export async function ambilJurnalSaya({ halaman, signal }: OpsiDaftar = {}) {
  // [EKSPERIMEN SOAL 5] Baris ini ditaruh di DALAM fungsi
  await new Promise((selesai) => setTimeout(selesai, halaman === 1 ? 4000 : 300));

  const body = await request<JurnalListResponse>("GET", "/me/jurnal", {
    query: { page: halaman, limit: 5 },
    signal,
  });
  return { daftar: body.data, meta: body.meta };
}

export async function buatJurnal(data: JurnalBaru) {
  const body = await request<JurnalResponse>("POST", "/jurnal", { body: data });
  return body.data;
}