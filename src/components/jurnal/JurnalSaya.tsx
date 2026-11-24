import { useState } from "react";
import { useJurnalSaya } from "../../hooks/useJurnalSaya";
import { pesanUntukPengguna } from "../../api/pesan";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import DaftarJurnal from "./DaftarJurnal";

// Tampilan baca-saja hari ini. Hapus dan review dihubungkan ke API hari Jumat.
function tidakMelakukanApaApa() {
  // sengaja kosong
}

export function JurnalSaya() {
  const [halaman, setHalaman] = useState(1);
  const { hasil, muatUlang } = useJurnalSaya(halaman);

  switch (hasil.status) {
    case "memuat":
      return <p role="status">Memuat jurnal...</p>;

    case "gagal":
      return (
        <Alert tipe="bahaya">
          <p>{pesanUntukPengguna(hasil.error)}</p>
          {hasil.error.requestId !== undefined && <p>Kode laporan: {hasil.error.requestId}</p>}
          <Button ukuran="sm" onClick={muatUlang}>Coba lagi</Button>
        </Alert>
      );

    case "berhasil": {
            const { daftar } = hasil.data;
     
      const meta = hasil.data.meta ?? { page: 1, totalPages: 1, hasNext: false, hasPrev: false };

      if (daftar.length === 0) {
        return <p>Belum ada jurnal. Tulis jurnal pertamamu!</p>;
      }

      return (
        <>
          <DaftarJurnal
            jurnal={daftar}
            role="peserta"
            pesanKosong="Belum ada jurnal."
            onHapus={tidakMelakukanApaApa}
            onUbahReview={tidakMelakukanApaApa}
          />
          <nav aria-label="Halaman">
            <Button ukuran="sm" variant="secondary" disabled={!meta.hasPrev} onClick={() => setHalaman((h) => h - 1)}>
              Sebelumnya
            </Button>
            <span> Halaman {meta.page} dari {meta.totalPages} </span>
            <Button ukuran="sm" variant="secondary" disabled={!meta.hasNext} onClick={() => setHalaman((h) => h + 1)}>
              Berikutnya
            </Button>
          </nav>
        </>
      );
    }
  }
}