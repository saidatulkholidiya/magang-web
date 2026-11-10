import type { Jurnal } from "../types/jurnal";
import { formatTanggal } from "../utils/format";

interface DaftarJurnalProps {
  jurnal: Jurnal[];
}

export default function DaftarJurnal({ jurnal }: DaftarJurnalProps) {
  if (jurnal.length === 0) {
    return <p>Belum ada jurnal.</p>;
  }

  // BUKTI 1: Cetak urutan asli sebelum di-sort
  console.log("SEBELUM SORT:", jurnal.map((j) => j.id));

  // SALIN dulu dengan [...] baru di-sort (terbaru ke terlama)
  const terurut = [...jurnal].sort(
    (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime()
  );

  // BUKTI 2: Cetak array asli setelah di-sort (harusnya TETAP SAMA)
  console.log("SESUDAH SORT (array asli):", jurnal.map((j) => j.id));
  
  // BUKTI 3: Cetak array salinan yang sudah terurut
  console.log("HASIL TERURUT (salinan):", terurut.map((j) => j.id));

  return (
    <ul>
      {terurut.map((j) => (
        <li key={j.id}>
          <strong>{j.kegiatan}</strong> — {formatTanggal(j.tanggal)}
          {j.hambatan && <p>Hambatan: {j.hambatan}</p>}
        </li>
      ))}
    </ul>
  );
}