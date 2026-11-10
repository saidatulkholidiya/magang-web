export interface Jurnal {
  id: number;
  kegiatan: string;
  tanggal: string;          // ISO string, mis. "2026-11-10T04:00:00.000Z"
  statusReview: "menunggu" | "disetujui" | "revisi";
  hambatan: string | null;  // null kalau tidak ada hambatan
  lampiran: string[];       // array path/file, bisa kosong
}