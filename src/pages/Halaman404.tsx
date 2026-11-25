import { Link } from "react-router";
import { Button } from "../components/ui/Button";

export function Halaman404() {
  return (
    <section>
      <h2>404: Halaman tidak ditemukan</h2>
      <p>Alamat yang kamu buka tidak ada.</p>
      <div style={{ marginTop: "1rem" }}>
        <Link to="/jurnal" style={{ textDecoration: "none" }}>
          <Button variant="secondary" ukuran="sm">← Kembali ke daftar jurnal</Button>
        </Link>
      </div>
    </section>
  );
}