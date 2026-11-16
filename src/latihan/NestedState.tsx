import { useState } from "react";
import { Button } from "../components/ui/Button";
import styles from "./Latihan.module.css";

export default function NestedState() {
  const [profil, setProfil] = useState({
    nama: "Budi",
    alamat: { kota: "Malang", kodePos: "65141" },
  });

  function ubahKota() {
    setProfil({
      ...profil,
      alamat: { ...profil.alamat, kota: "Jakarta" },
    });
  }

  return (
    <div className={styles.kotakBesar}>
      <h3>Uji Nested State</h3>
      <p>Nama: {profil.nama}</p>
      <p>Kota: {profil.alamat.kota}</p>
      <p>Kodepos: {profil.alamat.kodePos}</p>
      <Button onClick={ubahKota}>Pindah ke Jakarta</Button>
    </div>
  );
}