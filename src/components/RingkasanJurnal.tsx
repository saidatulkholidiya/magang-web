import type { Jurnal } from "../types/jurnal";

interface RingkasanJurnalProps {
  jurnal: Jurnal[];
}

export default function RingkasanJurnal({ jurnal }: RingkasanJurnalProps) {
  // 1. Hitung total
  const total = jurnal.length;
  
  // 2. Hitung yang sudah direview (status "disetujui")
  const sudahReview = jurnal.filter((j) => j.statusReview === "disetujui").length;
  
  // 3. Hitung yang belum direview
  const belumReview = total - sudahReview;

  return (
    <div>
      <p>Total jurnal: <strong>{total}</strong></p>
      <p>Sudah direview: <strong>{sudahReview}</strong></p>
      <p>Belum direview: <strong>{belumReview}</strong></p>
    </div>
  );
}