
import { Link, NavLink, Outlet, useNavigate } from "react-router";

import { useAuth } from "../auth/useAuth";
import { Button } from "../ui/Button";
import styles from "./LayoutAplikasi.module.css";

const kelasTautan = ({ isActive }: { isActive: boolean }) =>
  isActive ? styles.aktif : undefined;

export function LayoutAplikasi() {
  const navigate = useNavigate();
  const { auth, keluar } = useAuth();

  async function handleKeluar() {
    try {
      await keluar();
    } catch {
      // Status lokal tetap dihapus oleh fungsi keluar
    }

    navigate("/login", { replace: true });
  }

  return (
    <>
      <header className={styles.header}>
        <p className={styles.merek}>Jurnal Magang</p>

        <nav aria-label="Utama" className={styles.menu}>
          <NavLink to="/jurnal" className={kelasTautan}>
            Jurnal
          </NavLink>

          <NavLink to="/profil" className={kelasTautan}>
            Profil
          </NavLink>
        </nav>

        {auth.status === "masuk" ? (
          <>
            <span>{auth.pengguna.nama}</span>
            <Button
              variant="secondary"
              ukuran="sm"
              onClick={handleKeluar}
            >
              Keluar
            </Button>
          </>
        ) : (
          <Link to="/login">Masuk</Link>
        )}
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
