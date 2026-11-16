import type { StatusReview } from "../types/jurnal";

// Mengembalikan pesan error, atau null kalau valid.
// Aturan mencerminkan ReviewJurnalDto di API.
export function validasiReview(status: StatusReview, catatan: string): string | null {
  const bersih = catatan.trim();

  if (status === "sudah" && bersih.length < 5) {
    return "Catatan wajib diisi minimal 5 karakter untuk status sudah";
  }
  if (bersih.length > 2000) {
    return "Catatan maksimal 2000 karakter";
  }
  return null;
}