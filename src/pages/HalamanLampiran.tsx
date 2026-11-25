import { Link, useParams } from "react-router";
import { bacaAngkaPositif } from "../utils/url";
import { Halaman404 } from "./Halaman404";
import { Button } from "../components/ui/Button";

export function HalamanLampiran() {
  const { id, nomor } = useParams<{ id: string; nomor: string }>();
  
  const idJurnal = bacaAngkaPositif(id);
  const nomorLampiran = bacaAngkaPositif(nomor);

  if (idJurnal === null || nomorLampiran === null) return <Halaman404 />;

  return (
    <section>
      <h2>Lampiran</h2>
      <p>Jurnal nomor {idJurnal}, lampiran nomor {nomorLampiran}.</p>
      <div style={{ marginTop: "1rem" }}>
        <Link to={`/jurnal/${idJurnal}`} style={{ textDecoration: "none" }}>
          <Button variant="secondary" ukuran="sm">← Kembali ke jurnal</Button>
        </Link>
      </div>
    </section>
  );
}