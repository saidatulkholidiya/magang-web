import styles from "./StatusBadge.module.css";
import { cx } from "../../utils/cx";
import type { StatusReview } from "../../types/jurnal";

const label: Record<StatusReview, string> = {
  menunggu: "Menunggu review",
  disetujui: "Disetujui",
  revisi: "Perlu revisi",
};

export function StatusBadge({ status }: { status: StatusReview }) {
  return <span className={cx(styles.badge, styles[status])}>{label[status]}</span>;
}