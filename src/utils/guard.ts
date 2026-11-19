import type { FilterStatus } from "../types/jurnal";
import type { Jurnal } from "../api/types";

export function adalahFilterStatus(x: string): x is FilterStatus {
  return x === "semua" || x === "belum" || x === "sudah";
}

function adalahJurnal(x: unknown): x is Jurnal {
  return (
    typeof x === "object" && x !== null &&
    "id" in x && typeof x.id === "number" &&
    "kegiatan" in x && typeof x.kegiatan === "string" &&
    "statusReview" in x && (x.statusReview === "belum" || x.statusReview === "sudah") &&
    "createdAt" in x && typeof x.createdAt === "string"
  );
}

export const adalahDaftarJurnal = (x: unknown): x is Jurnal[] =>
  Array.isArray(x) && x.every(adalahJurnal);