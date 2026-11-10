import PesertaCard from "./components/PesertaCard";
import PesertaRingkas from "./components/PesertaRingkas";
import PesertaTanpaEmail from "./components/PesertaTanpaEmail";
import Kartu from "./components/Kartu";
import type { Peserta } from "./types/peserta";
import NomorUrut from "./components/NomorUrut";
import DaftarPeserta from "./components/DaftarPeserta";
import DaftarJurnal from "./components/DaftarJurnal";
import type { Jurnal } from "./types/jurnal";
import RingkasanJurnal from "./components/RingkasanJurnal";
import HasilJurnal from "./components/HasilJurnal";

const daftarPeserta: Peserta[] = [
  { id: 1, nama: "Saida", sekolah: "SMKN 6 Malang", email: "saida@gmail.com",  fase: 1, status: "aktif",    role: "peserta" },
  { id: 2, nama: "Ajeng", sekolah: "SMKN 6 Malang", email: "ajeng@gmail.com", fase: 2, status: "aktif",    role: "peserta" },
  { id: 3, nama: "Linda", sekolah: "SMKN 5 Malang", email: "linda@gmail.com", fase: 1, status: "lulus",    role: "peserta" },
  { id: 4, nama: "Zidan", sekolah: "SMKN 5 Malang", email: "zidan@gmail.com", fase: 3, status: "berhenti", role: "peserta" },
];

const daftarJurnal: Jurnal[] = [
  {
    id: 1,
    kegiatan: "Setup project Vite",
    tanggal: "2026-11-09T03:15:00.000Z",
    statusReview: "disetujui",
    hambatan: null,                          // null
    lampiran: [],
  },
  {
    id: 2,
    kegiatan: "Belajar komponen & props",
    tanggal: "2026-11-10T04:00:00.000Z",
    statusReview: "menunggu",
    hambatan: "Sempat salah taruh return di JSX",  // berisi
    lampiran: ["catatan.pdf"],
  },
  {
    id: 3,
    kegiatan: "Daftar, key, rendering bersyarat",
    tanggal: "2026-11-11T02:30:00.000Z",
    statusReview: "revisi",
    hambatan: null,
    lampiran: [],                            // kosong
  },
];

export default function App() {
  // const jumlah = 3;
  return (
    <main>
      <h1>Daftar Peserta Magang</h1>

      {/* Soal 1 & 2: PesertaCard */}
      {daftarPeserta.map((p) => (
        <PesertaCard key={p.id} peserta={p} tampilkanEmail={p.id === 1} />
      ))}

      {/* Soal 3: PesertaRingkas */}
      <h2>Ringkasan</h2>
      {daftarPeserta.map((p) => (
        <PesertaRingkas key={p.id} nama={p.nama} sekolah={p.sekolah} fase={p.fase} />
      ))}

      {/* Soal 3: PesertaTanpaEmail */}
      <h2>Tanpa Email</h2>
      {daftarPeserta.map((p) => (
        <PesertaTanpaEmail
          key={p.id}
          id={p.id}
          nama={p.nama}
          sekolah={p.sekolah}
          fase={p.fase}
          status={p.status}
          role={p.role}
        />
      ))}

      {/* Soal 4: Satu Kartu, tiga isi berbeda */}
      <Kartu judul="Profil Peserta">
        <PesertaCard peserta={daftarPeserta[0]} tampilkanEmail />
      </Kartu>

      <Kartu judul="Daftar Tautan">
        <ul>
          <li>
            <a href="https://react.dev">Dokumentasi React</a>
          </li>
          <li>
            <a href="https://vitejs.dev">Dokumentasi Vite</a>
          </li>
          <li>
            <a href="https://www.typescriptlang.org/docs/">Dokumentasi TypeScript</a>
          </li>
        </ul>
      </Kartu>

      <Kartu judul="Teks Biasa">
        <p>Ini hanya teks biasa di dalam Kartu. Komponen Kartu tidak peduli isinya.</p>
      </Kartu>

        {/* Soal 6: NomorUrut versi MURNI */}
      <h2>Nomor Urut (murni)</h2>
      <NomorUrut nomor={1} />
      <NomorUrut nomor={2} />
      <NomorUrut nomor={3} />

      <h2>Daftar Peserta (map + key)</h2>
      <DaftarPeserta peserta={daftarPeserta} />

      <h2>Daftar Jurnal</h2>
      <DaftarJurnal jurnal={daftarJurnal} />

      {/* <h2>Uji Jebakan 0 &&</h2> */}
      {/* {jumlah > 0 && <p>{jumlah} jurnal</p>} */}
    
      <h2>Ringkasan Jurnal</h2>
      <RingkasanJurnal jurnal={daftarJurnal} />

      <h2>Uji Props Union</h2>
      <HasilJurnal status="memuat" />
      <HasilJurnal status="berhasil" data={daftarJurnal} />
      <HasilJurnal status="gagal" pesan="Koneksi terputus" />

    </main>
  );
}