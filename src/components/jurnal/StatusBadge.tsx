import type { StatusReview } from "../../types/jurnal";
import styles from "./StatusBadge.module.css";

export default function StatusBadge({ status }: { status: StatusReview }) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      {status === "sudah" ? "Sudah direview" : "Belum direview"}
    </span>
  );
}