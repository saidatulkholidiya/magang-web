import { Link, useParams } from "react-router";
import { kodeLaporan, pesanUntukPengguna } from "../api/pesan";
import StatusBadge from "../components/jurnal/StatusBadge";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { useJurnal } from "../hooks/useJurnal";
import { formatTanggal } from "../utils/format";
import { bacaAngkaPositif } from "../utils/url";
import { Halaman404 } from "./Halaman404";

function DetailJurnal({ id }: { id: number }) {
  const { hasil, muatUlang } = useJurnal(id);

  switch (hasil.status) {
    case "memuat":
      return <p role="status">Memuat jurnal...</p>;

    case "gagal": {
      const { error } = hasil;

      if (error.kode === "NOT_FOUND") {
        return (
          <Alert tipe="bahaya">
            <p>Jurnal tidak ditemukan.</p>
          </Alert>
        );
      }
      if (error.kode === "FORBIDDEN") {
        return (
          <Alert tipe="bahaya">
            <p>Kamu tidak berhak membuka jurnal ini.</p>
          </Alert>
        );
      }

      const laporan = kodeLaporan(error);
      return (
        <Alert tipe="bahaya">
          <p>{pesanUntukPengguna(error)}</p>
          {laporan !== null && <p>{laporan}</p>}
          <Button ukuran="sm" onClick={muatUlang}>Coba lagi</Button>
        </Alert>
      );
    }

    case "berhasil": {
      const jurnal = hasil.data;
      return (
        <article>
          <p>
            {formatTanggal(jurnal.createdAt)} <StatusBadge status={jurnal.statusReview} />
          </p>
          <h3>{jurnal.kegiatan}</h3>
          {jurnal.hambatan && <p><strong>Hambatan:</strong> {jurnal.hambatan}</p>}
          {jurnal.catatanMentor && <p><strong>Catatan mentor:</strong> {jurnal.catatanMentor}</p>}
          {jurnal.linkCommit && (
            <p><a href={jurnal.linkCommit} target="_blank" rel="noreferrer">Lihat commit</a></p>
          )}
        </article>
      );
    }
  }
}

export function HalamanDetailJurnal() {
  const { id } = useParams<{ id: string }>();
  const nomor = bacaAngkaPositif(id);

  if (nomor === null) return <Halaman404 />;

  return (
    <section>
      <div style={{ marginBottom: "16px" }}>
  <Link to="/jurnal" style={{ textDecoration: "none" }}>
    <Button variant="secondary" ukuran="sm">← Kembali ke daftar jurnal</Button>
  </Link>
</div>
      <DetailJurnal id={nomor} />
    </section>
  );
}