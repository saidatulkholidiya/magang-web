import { useState } from "react";
import type { Jurnal } from "../types/jurnal";

export default function TipeState() {
  const [nama, _setNama] = useState<string>("Budi");
  const [aktif, _setAktif] = useState<boolean>(false);
  const [daftarJurnal, _setDaftarJurnal] = useState<Jurnal[]>([]);
  const [jurnalTerpilih, _setJurnalTerpilih] = useState<Jurnal | null>(null);
  const [filter, _setFilter] = useState<"semua" | "belum" | "sudah">("semua");

  return (
    <div>
      <p>Nama: {nama}</p>
      <p>Status: {aktif ? "Aktif" : "Mati"}</p>
      <p>Filter: {filter}</p>
      <p>Total Jurnal: {daftarJurnal.length}</p>
      {jurnalTerpilih && <p>Jurnal dipilih: {jurnalTerpilih.kegiatan}</p>}
    </div>
  );
}