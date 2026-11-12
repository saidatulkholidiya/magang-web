import { useState } from "react";
import Header from "./components/layout/Header";
import RingkasanJurnal from "./components/jurnal/RingkasanJurnal";
import DaftarJurnal from "./components/jurnal/DaftarJurnal";
import { FormJurnal } from "./components/jurnal/FormJurnal"; // <-- Sesuaikan path
import { profilPeserta, jurnalTiruan as dataAwal } from "./data/jurnalTiruan";
import type { Jurnal, StatusReview, JurnalBaru } from "./types/jurnal";
import "./App.css";
import { LatihanProfil } from "./latihan/LatihanProfil";

export default function App() {
  const [jurnal, setJurnal] = useState<Jurnal[]>(dataAwal);

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

  return (
    <main>
      <Header judul="Jurnal Magang" namaPeserta={profilPeserta.nama} />
      <RingkasanJurnal jurnal={jurnal} />
      {/* Form ditaruh di atas daftar */}
      <FormJurnal onTambah={tambahJurnal} />
      
      {/* DaftarJurnal hanya dipanggil SEKALI */}
      <DaftarJurnal 
        jurnal={jurnal} 
        onHapus={hapusJurnal} 
        onUbahStatus={ubahStatus} 
      />
      <LatihanProfil />
    </main>
  );
}