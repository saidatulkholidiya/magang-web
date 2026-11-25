// Angka bulat positif dari teks URL, atau null kalau bentuknya tidak valid.
// Regex menolak "3abc", "1e3", "3.5", "-5", "0x10", dan teks kosong.
export function bacaAngkaPositif(teks: string | null | undefined): number | null {
  if (teks === null || teks === undefined || !/^\d+$/.test(teks)) return null;
  const angka = Number(teks);
  return Number.isSafeInteger(angka) && angka >= 1 ? angka : null;
}