import type { Jurnal, StatusReview } from "../../types/jurnal";
import JurnalCard from "./JurnalCard";

interface DaftarJurnalProps {
  jurnal: readonly Jurnal[];
  onHapus: (id: number) => void;
  onUbahStatus: (id: number, status: StatusReview) => void;
}

export default function DaftarJurnal({ jurnal, onHapus, onUbahStatus }: DaftarJurnalProps) {
  if (jurnal.length === 0) {
    return <p>Belum ada jurnal.</p>;
  }

  const jurnalTerbaru = [...jurnal].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      {jurnalTerbaru.map((j) => (
        <JurnalCard 
          key={j.id} 
          jurnal={j} 
          onHapus={onHapus} 
          onUbahStatus={onUbahStatus} 
        />
      ))}
    </div>
  );
}