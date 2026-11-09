import PesertaCard from "./components/PesertaCard";
import PesertaRingkas from "./components/PesertaRingkas";
import PesertaTanpaEmail from "./components/PesertaTanpaEmail";
import Kartu from "./components/Kartu";
import type { Peserta } from "./types/peserta";
import NomorUrut from "./components/NomorUrut";

const daftarPeserta: Peserta[] = [
  { id: 1, nama: "Saida", sekolah: "SMKN 6 Malang", email: "budi@mail.com",  fase: 1, status: "aktif",    role: "peserta" },
  { id: 2, nama: "Ajeng", sekolah: "SMKN 6 Malang", email: "ajeng@mail.com", fase: 2, status: "aktif",    role: "peserta" },
  { id: 3, nama: "Linda", sekolah: "SMKN 5 Malang", email: "citra@mail.com", fase: 1, status: "lulus",    role: "peserta" },
  { id: 4, nama: "Zidan", sekolah: "SMKN 5 Malang", email: "dimas@mail.com", fase: 3, status: "berhenti", role: "peserta" },
];

export default function App() {
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
    </main>
  );
}