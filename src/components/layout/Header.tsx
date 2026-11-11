import styles from "./Header.module.css";

export default function Header({ judul, namaPeserta }: { judul: string; namaPeserta: string }) {
  return (
    <header className={styles.header}>
      <h1>{judul}</h1>
      <span>{namaPeserta}</span>
    </header>
  );
}