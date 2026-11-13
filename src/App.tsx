import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import RingkasanJurnal from "./components/jurnal/RingkasanJurnal";
import DaftarJurnal from "./components/jurnal/DaftarJurnal";
import { FormJurnal } from "./components/jurnal/FormJurnal";
import { PencarianJurnal } from "./components/jurnal/PencarianJurnal";
import { profilPeserta, jurnalTiruan as dataAwal } from "./data/jurnalTiruan";
import type { FilterStatus, Jurnal, StatusReview, JurnalBaru } from "./types/jurnal";
import "./App.css";
import { LatihanProfil } from "./latihan/LatihanProfil";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { adalahDaftarJurnal, adalahFilterStatus } from "./utils/guard";
import { usePenundaan } from "./hooks/usePenundaan";

export default function App() {
  const [jurnal, setJurnal] = useLocalStorage<Jurnal[]>(
    "jurnal-magang-v1",
    dataAwal,
    adalahDaftarJurnal
  );
  const [filter, setFilter] = useState<FilterStatus>("semua");
  const [kataKunci, setKataKunci] = useState("");
  const kataKunciTunda = usePenundaan(kataKunci, 300);
  useEffect(() => {
    document.title = `Jurnal Magang (${jurnal.length})`;
  }, [jurnal.length]);

  function hapusJurnal(id: number) {
    setJurnal((daftar) => daftar.filter((j) => j.id !== id));
  }

  function ubahStatus(id: number, status: StatusReview) {
    setJurnal((daftar) =>
      daftar.map((j) => (j.id === id ? { ...j, statusReview: status } : j))
    );
  }

  function tambahJurnal(data: JurnalBaru) {
    const baru: Jurnal = {
      id: Math.max(0, ...jurnal.map((j) => j.id)) + 1,
      pesertaId: 1,
      ...data,
      lampiran: null,
      statusReview: "belum",
      catatanMentor: null,
      createdAt: new Date().toISOString(),
    };
    setJurnal((daftar) => [baru, ...daftar]);
  }

  // DATA TURUNAN: dihitung setiap render, BUKAN state
  const tampil = jurnal
    .filter((j) => filter === "semua" || j.statusReview === filter)
    .filter((j) => j.kegiatan.toLowerCase().includes(kataKunciTunda.trim().toLowerCase()));

  const terurut = [...tampil].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <main>
      <Header judul="Jurnal Magang" namaPeserta={profilPeserta.nama} />
      <RingkasanJurnal jurnal={jurnal} />
      <FormJurnal onTambah={tambahJurnal} />

      <div className="alat">
        <label>
          Status
          <select
            value={filter}
            onChange={(e) => {
              const pilihan = e.target.value;
              if (adalahFilterStatus(pilihan)) setFilter(pilihan);
            }}
          >
            <option value="semua">Semua</option>
            <option value="belum">Belum direview</option>
            <option value="sudah">Sudah direview</option>
          </select>
        </label>
        <PencarianJurnal nilai={kataKunci} onUbah={setKataKunci} />
      </div>

      <DaftarJurnal
        jurnal={terurut}
        onHapus={hapusJurnal}
        onUbahStatus={ubahStatus}
      />
      <LatihanProfil />
    </main>
  );
}