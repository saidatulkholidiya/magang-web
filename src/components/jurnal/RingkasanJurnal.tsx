import type { Jurnal } from "../../types/jurnal";
import styles from "./RingkasanJurnal.module.css";

export default function RingkasanJurnal({ jurnal }: { jurnal: Jurnal[] }) {
  const total = jurnal.length;
  const sudah = jurnal.filter((j) => j.statusReview === "sudah").length;
  const belum = total - sudah;

  return (
    <div className={styles.ringkasan}>
      <div className={styles.item}>
        <span>Total</span>
        <strong>{total}</strong>
      </div>
      <div className={styles.item}>
        <span>Sudah direview</span>
        <strong className={styles.sukses}>{sudah}</strong>
      </div>
      <div className={styles.item}>
        <span>Belum</span>
        <strong className={styles.bahaya}>{belum}</strong>
      </div>
    </div>
  );
}