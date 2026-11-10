import { Button } from "../ui/Button";
import { Kartu } from "../ui/Kartu";
import { StatusBadge } from "./StatusBadge";
import type { Jurnal } from "../../types/jurnal";

interface JurnalCardProps {
  jurnal: Jurnal;
  onHapus?: (id: number) => void; // opsional
}

export function JurnalCard({ jurnal, onHapus }: JurnalCardProps) {
  return (
    <Kartu>
      <p>{jurnal.kegiatan}</p>
      <StatusBadge status={jurnal.statusReview} />
      {onHapus && (
        <Button variant="danger" ukuran="sm" onClick={() => onHapus(jurnal.id)}>
          Hapus
        </Button>
      )}
    </Kartu>
  );
}