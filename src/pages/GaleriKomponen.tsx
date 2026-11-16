import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { Badge } from "../components/ui/Badge";
import { Kartu } from "../components/ui/Kartu";
import StatusBadge from "../components/jurnal/StatusBadge";
import JurnalCard from "../components/jurnal/JurnalCard";
import { jurnalTiruan } from "../data/jurnalTiruan";
import styles from "./GaleriKomponen.module.css";

const varian = ["primary", "secondary", "danger"] as const;
const ukuran = ["sm", "md"] as const;

// Galeri hanya menampilkan tampilan, jadi handler sengaja tidak melakukan apa-apa.
function tidakMelakukanApaApa() {
  // sengaja kosong
}

export function GaleriKomponen() {
  return (
    <main className={styles.halaman}>
      <h1>Galeri Komponen</h1>

      <section>
        <h2>Button</h2>
        {varian.map((v) => (
          <div key={v} className={styles.barisRapat}>
            {ukuran.map((u) => (
              <Button key={u} variant={v} ukuran={u}>
                {v} {u}
              </Button>
            ))}
            <Button variant={v} disabled>
              {v} disabled
            </Button>
          </div>
        ))}
      </section>

      <section>
        <h2>Button di dalam form (uji type)</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("form di-submit");
          }}
          className={styles.baris}
        >
          <Button>Bawaan (tidak submit)</Button>
          <Button type="submit">Submit</Button>
        </form>
      </section>

      <section>
        <h2>Alert</h2>
        <div className={styles.tumpukan}>
          <Alert tipe="info">Informasi biasa</Alert>
          <Alert tipe="sukses">Berhasil disimpan</Alert>
          <Alert tipe="bahaya">Terjadi kesalahan</Alert>
        </div>
      </section>

      <section>
        <h2>Badge</h2>
        <div className={styles.baris}>
          <Badge>abu</Badge>
          <Badge warna="biru">biru</Badge>
          <Badge warna="hijau">hijau</Badge>
          <Badge warna="merah">merah</Badge>
        </div>
      </section>

      <section>
        <h2>Kartu</h2>
        <Kartu>Isi kartu sederhana</Kartu>
      </section>

      <section>
        <h2>StatusBadge</h2>
        <div className={styles.baris}>
          <StatusBadge status="belum" />
          <StatusBadge status="sudah" />
        </div>
      </section>

      <section>
        <h2>JurnalCard</h2>
        <div className={styles.tumpukan}>
          <h3>Mode peserta</h3>
          <JurnalCard
            jurnal={jurnalTiruan[0]}
            role="peserta"
            onHapus={tidakMelakukanApaApa}
            onUbahReview={tidakMelakukanApaApa}
          />

          <h3>Mode mentor (ada tombol Review)</h3>
          <JurnalCard
            jurnal={jurnalTiruan[0]}
            role="mentor"
            onHapus={tidakMelakukanApaApa}
            onUbahReview={tidakMelakukanApaApa}
          />
        </div>
      </section>
    </main>
  );
}