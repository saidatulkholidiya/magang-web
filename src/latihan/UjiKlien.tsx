import { useState } from "react";
import { login } from "../api/auth";
import { setAccessToken } from "../api/client";
import { ApiError } from "../api/errors";
import { ambilJurnalSaya } from "../api/jurnal";
import { request } from "../api/client";
import {  kodeLaporan, pesanUntukPengguna } from "../api/pesan";

async function jalankan(nama: string, aksi: () => Promise<unknown>) {
  try {
    const hasil = await aksi();
    console.log(nama, "BERHASIL", hasil);
  } catch (err) {
    if (err instanceof ApiError) {
      console.log(nama, "ApiError", {
        status: err.status,
        kode: err.kode,
        pesan: err.message,
        requestId: err.requestId,
        detail: err.detail,
      });
    } else {
      console.log(nama, "error lain", err);
    }
  }
}

export function UjiKlien() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section>
      <h2>Uji klien API (sementara)</h2>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <button type="button" onClick={() => void jalankan("login", () => login(email, password))}>
        Login
      </button>
      <button type="button" onClick={() => void jalankan("login salah", () => login(email, "salahsalah"))}>
        Login password salah
      </button>
      <button type="button" onClick={() => setAccessToken(null)}>
        Keluar (hapus token)
      </button>
      <button type="button" onClick={() => void jalankan("jurnal saya", () => ambilJurnalSaya())}>
        Ambil jurnal saya
      </button>
      <button type="button" onClick={() => void jalankan("bukan json", () => request("GET", "/../docs/"))}>
        Uji bukan JSON
    </button>
    <button
  type="button"
  onClick={() => {
    const contoh: ApiError[] = [
      new ApiError("x", 0, "NETWORK_ERROR"),
      new ApiError("x", 401, "UNAUTHORIZED"),
      new ApiError("x", 403, "FORBIDDEN"),
      new ApiError("x", 404, "NOT_FOUND"),
      new ApiError("x", 429, "RATE_LIMITED"),
      new ApiError("x", 422, "VALIDATION_ERROR", [], "abc-123"),
    ];
    for (const e of contoh) console.log(e.kode, "→", pesanUntukPengguna(e), kodeLaporan(e));
  }}
>
  Uji pesan
</button>
    </section>
  );
}