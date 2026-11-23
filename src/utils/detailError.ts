import type { FieldError } from "../api/types";
import type { FormJurnalErrors } from "./validasiJurnal";

export type ErrorLogin = Partial<Record<"email" | "password", string>>;

// Memetakan detail 422 server ke kolom form jurnal. Yang tidak dikenal menjadi pesan umum.
export function detailKeErrors(detail: readonly FieldError[]): {
  kolom: FormJurnalErrors;
  umum: string[];
} {
  const kolom: FormJurnalErrors = {};
  const umum: string[] = [];

  for (const d of detail) {
    if (d.field === "kegiatan" || d.field === "hambatan" || d.field === "linkCommit") {
      kolom[d.field] = d.pesan;
    } else {
      umum.push(`${d.field}: ${d.pesan}`);
    }
  }

  return { kolom, umum };
}

// Sama, untuk form login
export function detailLoginKeErrors(detail: readonly FieldError[]): {
  kolom: ErrorLogin;
  umum: string[];
} {
  const kolom: ErrorLogin = {};
  const umum: string[] = [];

  for (const d of detail) {
    if (d.field === "email" || d.field === "password") {
      kolom[d.field] = d.pesan;
    } else {
      umum.push(`${d.field}: ${d.pesan}`);
    }
  }

  return { kolom, umum };
}