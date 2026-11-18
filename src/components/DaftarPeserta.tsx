import type { Peserta } from "../api/types";

interface DaftarPesertaProps {
  peserta: Peserta[];
}

export default function DaftarPeserta({ peserta }: DaftarPesertaProps) {
    if (peserta.length === 0) {
        return <p>Belum ada peserta.</p>;
    }
    
    return (
    <ul>
      {peserta.map((p) => (
        <li key={p.id}>
          {p.nama} — {p.sekolah}
        </li>
      ))}
    </ul>
  );
}