import { useState } from "react";
import styles from "./Latihan.module.css";

export default function DemoKunciIndeks() {
  const [item, setItem] = useState(["Satu", "Dua", "Tiga"]);

  return (
    <div className={styles.halaman}>
      <ul>
        {item.map((nama) => (
          <li key={nama}>
            {nama} <input placeholder="catatan" />
          </li>
    ))}
      </ul>
      <button onClick={() => setItem(item.slice(1))}>Hapus yang pertama</button>
    </div>
  );
}