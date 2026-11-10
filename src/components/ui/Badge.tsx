import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Badge.module.css";

interface BadgeProps {
  warna?: "abu" | "biru" | "hijau" | "merah";
  children: ReactNode;
}

export function Badge({ warna = "abu", children }: BadgeProps) {
  return <span className={cx(styles.badge, styles[warna])}>{children}</span>;
}