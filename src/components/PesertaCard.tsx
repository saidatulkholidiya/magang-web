import type { Peserta } from "../types/peserta";
import InfoBaris from "./InfoBaris";

interface PesertaCardProps {
  peserta: Peserta;
  tampilkanEmail?: boolean;
}

export default function PesertaCard({ peserta, tampilkanEmail = false }: PesertaCardProps) {
  return (
    <article>
      <h3>{peserta.nama}</h3>
      <InfoBaris label="Sekolah" nilai={peserta.sekolah} />
      <InfoBaris label="Fase" nilai={String(peserta.fase)} />
      <InfoBaris label="Status" nilai={peserta.status} />
      {tampilkanEmail && <InfoBaris label="Email" nilai={peserta.email} />}
    </article>
  );
}