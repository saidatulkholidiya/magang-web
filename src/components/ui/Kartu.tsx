import type { ReactNode } from "react";
import styles from "./Kartu.module.css";

interface KartuProps {
  children: ReactNode;
}

export function Kartu({ children }: KartuProps) {
  return <article className={styles.kartu}>{children}</article>;
}