import { buatJurnal } from "../../api/jurnal";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import type { JurnalBaru } from "../../api/types";
import { useJurnalSaya } from "../../hooks/useJurnalSaya";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import DaftarJurnal from "./DaftarJurnal";
import { FormJurnal } from "./FormJurnal";

// Hapus dan review belum terhubung ke API
function tidakMelakukanApaApa() {
  // sengaja kosong
}

interface JurnalSayaProps {
  halaman: number;
  onGantiHalaman: (halaman: number) => void;
}

export function JurnalSaya({ halaman, onGantiHalaman }: JurnalSayaProps) {
  const { hasil, muatUlang } = useJurnalSaya(halaman);

  async function tambah(data: JurnalBaru): Promise<void> {
    await buatJurnal(data);
    onGantiHalaman(1); // jurnal terbaru ada di halaman pertama
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
//const meta = hasil.data.meta ?? { page: 2, totalPages: 3, hasNext: true, hasPrev: true };
const meta = hasil.data.meta ?? { page: 1, totalPages: 1, hasNext: false, hasPrev: false };

        if (daftar.length === 0) {
          // URL bisa menunjuk halaman yang tidak ada (?halaman=999)
          if (halaman > 1) {
            return (
              <div>
                <p>Halaman {halaman} tidak ada.</p>
                <Button ukuran="sm" onClick={() => onGantiHalaman(1)}>Ke halaman 1</Button>
              </div>
            );
          }
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
              <Button ukuran="sm" variant="secondary" disabled={!meta.hasPrev} onClick={() => onGantiHalaman(halaman - 1)}>
                Sebelumnya
              </Button>
              <span> Halaman {meta.page} dari {meta.totalPages} </span>
              <Button ukuran="sm" variant="secondary" disabled={!meta.hasNext} onClick={() => onGantiHalaman(halaman + 1)}>
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