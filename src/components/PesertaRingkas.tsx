import type { Peserta } from "../api/types";

type PesertaRingkasProps = Pick<Peserta, "nama" | "sekolah" | "fase">;

export default function PesertaRingkas({ nama, sekolah, fase }: PesertaRingkasProps) {
  return (
    <p>
      {nama} ({sekolah}), fase {fase}
    </p>
  );
}