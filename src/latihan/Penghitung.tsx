import { useState } from "react";
import { Button } from "../components/ui/Button";
import styles from "./Latihan.module.css";

export default function Penghitung() {
  const [jumlah, setJumlah] = useState(0);

  return (
    <div className={styles.kotak}>
      <h3>Jumlah: {jumlah}</h3>
      <div className={styles.baris}>
        <Button onClick={() => setJumlah(jumlah + 1)}>Tambah (+)</Button>
        <Button variant="secondary" onClick={() => setJumlah(jumlah > 0 ? jumlah - 1 : 0)}>Kurang (-)</Button>
        <Button variant="danger" onClick={() => setJumlah(0)}>Reset</Button>
      </div>
    </div>
  );
}