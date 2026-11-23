import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import { SaklarPeran } from "./components/layout/SaklarPeran"; // BARU
import RingkasanJurnal from "./components/jurnal/RingkasanJurnal";
import DaftarJurnal from "./components/jurnal/DaftarJurnal";
import { FormJurnal } from "./components/jurnal/FormJurnal";
import { PencarianJurnal } from "./components/jurnal/PencarianJurnal";
import { profilPeserta, jurnalTiruan as dataAwal } from "./data/jurnalTiruan";
import type { Jurnal, StatusReview, JurnalBaru } from "./api/types";
import type { FilterStatus } from "./types/jurnal";
import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { adalahDaftarJurnal, adalahFilterStatus } from "./utils/guard";
import { usePenundaan } from "./hooks/usePenundaan";
import type { role } from "./types/peserta";
import { HalamanUjiJurnal } from "./latihan/HalamanUjiJurnal";

export default function App() {
  const [jurnal, setJurnal] = useLocalStorage<Jurnal[]>(
    "jurnal-magang-v1",
    dataAwal,
    adalahDaftarJurnal
  );
  const [role, setRole] = useState<role>("peserta");
  const [filter, setFilter] = useState<FilterStatus>("semua");
  const [kataKunci, setKataKunci] = useState("");
  const kataKunciTunda = usePenundaan(kataKunci, 300);

  // DATA TURUNAN: dihitung setiap render, BUKAN state
  const belumDireview = jurnal.filter((j) => j.statusReview === "belum").length; // BARU

  const tampil = jurnal
    .filter((j) => filter === "semua" || j.statusReview === filter)
    .filter((j) => j.kegiatan.toLowerCase().includes(kataKunciTunda.trim().toLowerCase()));

  useEffect(() => {
    document.title = `Jurnal Magang (${belumDireview} belum direview)`; // UBAH
  }, [belumDireview]);

  const pesanKosong =
    jurnal.length === 0
      ? "Belum ada jurnal. Tulis jurnal pertamamu lewat formulir di atas."
      : "Tidak ada jurnal yang cocok dengan filter atau pencarian.";

  function hapusJurnal(id: number) {
    setJurnal((daftar) => daftar.filter((j) => j.id !== id));
  }

  function ubahReview(id: number, status: StatusReview) {
    setJurnal((daftar) =>
      daftar.map((j) => (j.id === id ? { ...j, statusReview: status } : j))
    );
  }

  function tambahJurnal(data: JurnalBaru) {
    const baru: Jurnal = {
      id: Math.max(0, ...jurnal.map((j) => j.id)) + 1,
      pesertaId: 1,
      ...data,
      lampiran: undefined, // sementara kosong
      statusReview: "belum",
      catatanMentor: null,
      createdAt: new Date().toISOString(),
    };
    setJurnal((daftar) => [baru, ...daftar]);
  }

  return (
    <main>
      <Header judul="Jurnal Magang" namaPeserta={profilPeserta.nama} />
      <SaklarPeran role={role} onUbah={setRole} /> 
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
        jurnal={tampil}
        role={role} 
        pesanKosong={pesanKosong}
        onHapus={hapusJurnal}
        onUbahReview={ubahReview}
      />
      <HalamanUjiJurnal />
    </main>
  );
}