import { Link } from "react-router";
import { useAuth } from "../auth/useAuth";
import { Button } from "../ui/Button";
import styles from "./Header.module.css";

export default function Header({ judul }: { judul: string }) {
  const { auth, keluar } = useAuth();

  async function handleKeluar() {
    try {
      await keluar();
    } finally {
      // Status lokal sudah dihapus oleh fungsi keluar.
      // Arahkan pengguna ke halaman login.
      window.location.replace("/login");
    }
  }

  return (
    <header className={styles.header}>
      <h1>{judul}</h1>

      {auth.status === "masuk" ? (
        <div className={styles.aksi}>
          <span>{auth.pengguna.nama}</span>
          <Button
            variant="secondary"
            ukuran="sm"
            onClick={handleKeluar}
          >
            Keluar
          </Button>
        </div>
      ) : (
        <Link to="/login">Masuk</Link>
      )}
    </header>
  );
}