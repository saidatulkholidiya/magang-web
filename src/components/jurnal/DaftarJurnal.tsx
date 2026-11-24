import { Alert } from "../ui/Alert";
import JurnalCard from "./JurnalCard";
import type { Jurnal, StatusReview } from "../../api/types";
import type { role } from "../../types/peserta";

interface DaftarJurnalProps {
  jurnal: readonly Jurnal[];
  role: role;
  pesanKosong: string;
  onHapus: (id: number) => void;
  onUbahReview: (id: number, status: StatusReview, catatan: string | null) => void;
}

export default function DaftarJurnal({
  jurnal,
  role,
  pesanKosong,
  onHapus,
  onUbahReview,
}: DaftarJurnalProps) {
  if (jurnal.length === 0) {
    return <Alert tipe="info">{pesanKosong}</Alert>;
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
          role={role}
          onHapus={onHapus}
          onUbahReview={onUbahReview}
        />
      ))}
    </div>
  );
}