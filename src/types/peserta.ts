export interface Peserta {
  id: number;
  nama: string;
  sekolah: string;
  email: string;
  fase: number;
  status: "aktif" | "lulus" | "berhenti";
  role: "peserta" | "mentor";
}