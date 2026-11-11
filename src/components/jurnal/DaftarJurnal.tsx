import type { Jurnal } from "../../types/jurnal";
import JurnalCard from "./JurnalCard";

interface DaftarJurnalProps {
  jurnal: Jurnal[];
}

export default function DaftarJurnal({ jurnal }: DaftarJurnalProps) {
  if (jurnal.length === 0) {
    return <p>Belum ada jurnal.</p>;
  }

  // Mengurutkan dari terbaru tanpa merusak array asli
  const jurnalTerbaru = [...jurnal].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      {jurnalTerbaru.map((j) => (
        <JurnalCard key={j.id} jurnal={j} />
      ))}
    </div>
  );
}