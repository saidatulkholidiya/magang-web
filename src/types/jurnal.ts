export type StatusReview = "belum" | "sudah";

export interface Lampiran {
  url: string;
  keterangan?: string;
}

export interface Jurnal {
  id: number;
  pesertaId: number;
  kegiatan: string;
  hambatan?: string | null;
  linkCommit?: string | null;
  lampiran?: Lampiran[] | null;
  statusReview: StatusReview;
  catatanMentor?: string | null;
  createdAt: string;
}