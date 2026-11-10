export type StatusReview = "menunggu" | "disetujui" | "revisi";

export interface Jurnal {
  id: number;
  kegiatan: string;
  tanggal: string;
  statusReview: StatusReview;
  hambatan: string | null;
  lampiran: string[];
}