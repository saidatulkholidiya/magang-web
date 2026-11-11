import { useState } from "react";
import Header from "./components/layout/Header";
import RingkasanJurnal from "./components/jurnal/RingkasanJurnal";
import DaftarJurnal from "./components/jurnal/DaftarJurnal";
import { profilPeserta, jurnalTiruan as dataAwal } from "./data/jurnalTiruan";
import type { Jurnal, StatusReview } from "./types/jurnal";
import "./App.css";

export default function App() {
  const [jurnal, setJurnal] = useState<Jurnal[]>(dataAwal);

  // Fungsi Hapus (Pakai Filter)
  function hapusJurnal(id: number) {
    setJurnal((daftar) => daftar.filter((j) => j.id !== id));
  }

  // Fungsi Ubah Status (Pakai Map & Spread)
  function ubahStatus(id: number, status: StatusReview) {
    setJurnal((daftar) =>
      daftar.map((j) => (j.id === id ? { ...j, statusReview: status } : j))
    );
  }

  return (
    <main>
      <Header judul="Jurnal Magang" namaPeserta={profilPeserta.nama} />
      <RingkasanJurnal jurnal={jurnal} />
      <DaftarJurnal 
        jurnal={jurnal} 
        onHapus={hapusJurnal} 
        onUbahStatus={ubahStatus} 
      />
    </main>
  );
}