import type { Peserta } from "../types/peserta";

export function tambahPeserta(daftar: readonly Peserta[], baru: Peserta): Peserta[] {
  return [...daftar, baru];
}

export function hapusPeserta(daftar: readonly Peserta[], id: number): Peserta[] {
  return daftar.filter((p) => p.id !== id);
}

export function gantiPeserta(daftar: readonly Peserta[], id: number, baru: Peserta): Peserta[] {
  return daftar.map((p) => (p.id === id ? baru : p));
}

export function ubahNamaPeserta(daftar: readonly Peserta[], id: number, namaBaru: string): Peserta[] {
  return daftar.map((p) => (p.id === id ? { ...p, nama: namaBaru } : p));
}

export function urutkanPeserta(daftar: readonly Peserta[]): Peserta[] {
  return [...daftar].sort((a, b) => a.nama.localeCompare(b.nama));
}