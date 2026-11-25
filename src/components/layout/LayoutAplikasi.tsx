import { NavLink, Outlet, useNavigate } from "react-router";
import { setAccessToken } from "../../api/client"; 
import { Button } from "../ui/Button"; 
import styles from "./LayoutAplikasi.module.css";

// NavLink memberi tahu apakah tautannya sedang aktif
const kelasTautan = ({ isActive }: { isActive: boolean }) => (isActive ? styles.aktif : undefined);

export function LayoutAplikasi() {
  const navigate = useNavigate();

  function keluar() {
    setAccessToken(null);
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header className={styles.header}>
        <p className={styles.merek}>Jurnal Magang</p>
        <nav aria-label="Utama" className={styles.menu}>
          <NavLink to="/jurnal" className={kelasTautan}>Jurnal</NavLink>
          <NavLink to="/profil" className={kelasTautan}>Profil</NavLink>
          {/*<a href="/profil">Profil</a>*/}
        </nav>
        <Button variant="secondary" ukuran="sm" onClick={keluar}>Keluar</Button>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}