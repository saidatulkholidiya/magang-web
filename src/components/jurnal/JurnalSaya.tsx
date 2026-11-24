import { useState } from "react";
import { buatJurnal, hapusJurnal } from "../../api/jurnal";
import { keApiError } from "../../api/errors";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import type { JurnalBaru } from "../../api/types";
import { useJurnalSaya } from "../../hooks/useJurnalSaya";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import DaftarJurnal from "./DaftarJurnal";
import { FormJurnal } from "./FormJurnal";

// Review belum terhubung ke API (hapus sudah terhubung di bonus)
function tidakMelakukanApaApa() {
  // sengaja kosong
}

export function JurnalSaya() {
  const [halaman, setHalaman] = useState(1);
  const { hasil, muatUlang } = useJurnalSaya(halaman);
  const [galatHapus, setGalatHapus] = useState<string | null>(null);

  function hapus(id: number) {
    setGalatHapus(null);
    hapusJurnal(id)
      .then(muatUlang)
      .catch((err: unknown) => setGalatHapus(pesanUntukPengguna(keApiError(err))));
  }

  async function tambah(data: JurnalBaru): Promise<void> {
    await buatJurnal(data);
    setHalaman(1); // jurnal terbaru ada di halaman pertama
    muatUlang();
  }

  function isiDaftar() {
    switch (hasil.status) {
      case "memuat":
        return <p role="status">Memuat jurnal...</p>;

      case "gagal": {
        const laporan = kodeLaporan(hasil.error);
        return (
          <Alert tipe="bahaya">
            <p>{pesanUntukPengguna(hasil.error)}</p>
            {laporan !== null && <p>{laporan}</p>}
            <Button ukuran="sm" onClick={muatUlang}>Coba lagi</Button>
          </Alert>
        );
      }

      case "berhasil": {
        const { daftar } = hasil.data;
        // Cadangan kalau backend tidak mengirim meta (temuan nyata!)
       // const meta = hasil.data.meta ?? { page: 2, totalPages: 3, hasNext: true, hasPrev: true };
        const meta = hasil.data.meta ?? { page: 1, totalPages: 1, hasNext: false, hasPrev: false };
        if (daftar.length === 0) {
          return <p>Belum ada jurnal. Tulis jurnal pertamamu!</p>;
        }

        return (
          <>
            {galatHapus !== null && (
              <Alert tipe="bahaya">
                <p>{galatHapus}</p>
              </Alert>
            )}
            <DaftarJurnal
              jurnal={daftar}
              role="peserta"
              pesanKosong="Belum ada jurnal."
              onHapus={hapus}
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

  return (
    <section>
      <FormJurnal onTambah={tambah} />
      {isiDaftar()}
    </section>
  );
}