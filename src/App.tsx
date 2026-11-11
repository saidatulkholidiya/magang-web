import Header from "./components/layout/Header";
import RingkasanJurnal from "./components/jurnal/RingkasanJurnal";
import DaftarJurnal from "./components/jurnal/DaftarJurnal";
import { jurnalTiruan, profilPeserta } from "./data/jurnalTiruan";
import "./App.css";

export default function App() {
  return (
    <main>
      <Header judul="Jurnal Magang" namaPeserta={profilPeserta.nama} />
      <RingkasanJurnal jurnal={jurnalTiruan} />
      <DaftarJurnal jurnal={jurnalTiruan} />
    </main>
  );
}