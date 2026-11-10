import type { MouseEvent } from "react";
import { Button } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";
import { Badge } from "../components/ui/Badge";
import { Kartu } from "../components/ui/Kartu";
import { StatusBadge } from "../components/jurnal/StatusBadge";
import { JurnalCard } from "../components/jurnal/JurnalCard";
import type { Jurnal } from "../types/jurnal";

const varian = ["primary", "secondary", "danger"] as const;
const ukuran = ["sm", "md"] as const;


const contoh: Jurnal = {
  id: 7,
  kegiatan: "Belajar CSS Modules",
  tanggal: "2026-11-11T05:30:00.000Z",
  statusReview: "menunggu",
  hambatan: null,
  lampiran: [],
} as Jurnal;

export function GaleriKomponen() {
  function klik(e: MouseEvent<HTMLButtonElement>) {
    console.log(`Diklik di x=${e.clientX}, y=${e.clientY}`);
  }

  return (
    <main style={{ padding: 24, display: "grid", gap: 24 }}>
      <h1>Galeri Komponen</h1>

      <section>
        <h2>Button</h2>
        {varian.map((v) => (
          <div key={v} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
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
        <Button onClick={klik}>Cetak koordinat</Button>
      </section>

      <section>
        <h2>Button di dalam form (uji type)</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("form di-submit");
          }}
          style={{ display: "flex", gap: 8 }}
        >
          <Button>Bawaan (tidak submit)</Button>
          <Button type="submit">Submit</Button>
        </form>
      </section>

      <section>
        <h2>Alert</h2>
        <div style={{ display: "grid", gap: 12 }}>
          <Alert tipe="info">Informasi biasa</Alert>
          <Alert tipe="sukses">Berhasil disimpan</Alert>
          <Alert tipe="bahaya">Terjadi kesalahan</Alert>
        </div>
      </section>

      <section>
        <h2>Badge</h2>
        <div style={{ display: "flex", gap: 8 }}>
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
  <div style={{ display: "flex", gap: 8 }}>
    <StatusBadge status="menunggu" />
    <StatusBadge status="disetujui" />
    <StatusBadge status="revisi" />
  </div>
</section>

      <section>
        <h2>JurnalCard</h2>
        <div style={{ display: "grid", gap: 12 }}>
          <h3>Tanpa onHapus (tombol tidak ada)</h3>
          <JurnalCard jurnal={contoh} />

          <h3>Dengan onHapus (cek console)</h3>
          <JurnalCard
            jurnal={contoh}
            onHapus={(id) => console.log("hapus", id)}
          />
        </div>
      </section>

      {/*
      <h2>Button dengan onClick langsung</h2>
        <Button onClick={console.log("langsung!")}>Salah</Button>
      */}
    </main>
  );
}