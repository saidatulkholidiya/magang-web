# Magang Web (Frontend)

## Jawaban Soal 8 (Minggu 17 - Senin)

**1. Apa bedanya pendekatan imperatif dan deklaratif?**
Pendekatan imperatif (seperti JavaScript DOM biasa) berfokus pada *bagaimana* cara mencapai suatu hasil, di mana kita harus memerintahkan browser langkah demi langkah (misal: buat elemen, ubah teks, lalu masukkan ke halaman). Sedangkan pendekatan deklaratif (seperti React) berfokus pada *apa* hasil akhir yang diinginkan; kita cukup mendeskripsikan tampilan berdasarkan data, dan React yang akan mengurus langkah-langkah pembaruan DOM secara efisien di balik layar.

**2. Kenapa frontend dan backend dibuat sebagai dua aplikasi terpisah?**
Memisahkan frontend dan backend membuat sistem lebih modular dan fleksibel. Backend (API) bisa digunakan oleh berbagai platform sekaligus (web, mobile, atau aplikasi pihak ketiga) tanpa harus mengubah kodenya. Selain itu, tim pengembang bisa bekerja secara paralel (tim frontend fokus pada UI/UX di browser, tim backend fokus pada database dan logika bisnis di server), serta memudahkan proses *deployment* dan *scaling* di masa depan.

## Jawaban Soal 2 (Minggu 17 - Selasa)

### Kasus A — properti `fase` bertipe string

Kode yang diuji:
```tsx
const salah: Peserta = { id: 1, nama: "X", sekolah: "Y", email: "z@mail.com",
                          fase: "satu", status: "aktif", role: "peserta" };
```

Hasil:
- VS Code: garis merah di `"satu"`, tooltip `Type 'string' is not assignable to type 'number'. ts(2322)`
- Terminal (`npm run build`):
  ```
  src/App.tsx:18:5 - error TS2322: Type 'string' is not assignable to type 'number'.
  18     fase: "satu",
         ~~~~
    src/types/peserta.ts:6:3 - The expected type comes from property 'fase'
    which is declared here on type 'Peserta'
      6   fase: number;
  ```

Penyebab: `Peserta.fase` bertipe `number`, sedangkan `"satu"` bertipe `string`.
Perbaikan: ganti `"satu"` menjadi `1`.

Catatan penting:
- Saat `npm run dev`, error TIDAK muncul di browser (Vite tidak menjalankan tsc).
- Error tipe baru muncul di editor dan saat `npm run build` (tsc -b).
- `npm run build` = `tsc -b && vite build`. Kalau tsc gagal, vite build tidak jalan.

### Kasus B — prop yang tidak dikenal (`umur`)

Kode yang diuji:
```tsx
<PesertaCard peserta={daftarPeserta[0]} umur={20} />
```

Hasil:
- VS Code: garis merah di bawah `umur`, tooltip `Property 'umur' does not exist on type 'IntrinsicAttributes & PesertaCardProps'. ts(2322)`
- Terminal (`npm run build`):
  ```
  src/App.tsx:32:47 - error TS2322: Type '{ peserta: Peserta; umur: number; }'
  is not assignable to type 'IntrinsicAttributes & PesertaCardProps'.
    Property 'umur' does not exist on type 'IntrinsicAttributes & PesertaCardProps'.
  32       <PesertaCard peserta={daftarPeserta[0]} umur={20} />
                                                   ~~~~
  ```

Penyebab: `PesertaCardProps` hanya mendefinisikan `peserta` dan `tampilkanEmail?`, tidak ada properti `umur`.
Perbaikan: hapus prop `umur` (atau tambahkan `umur?: number` ke interface jika memang dibutuhkan).

### Kasus C — properti wajib (`nama`) hilang

Kode yang diuji:
```tsx
const salah: Peserta = { id: 2, sekolah: "Y", email: "z@mail.com",
                         fase: 1, status: "aktif", role: "peserta" };  // tanpa nama
```

Hasil:
- VS Code: garis merah di `salah`, tooltip `Property 'nama' is missing in type '{...}' but required in type 'Peserta'. ts(2741)`
- Terminal (`npm run build`):
  ```
  src/App.tsx:13:9 - error TS2741: Property 'nama' is missing in type
  '{ id: number; sekolah: string; email: string; fase: number; status: "aktif"; role: "peserta"; }'
  but required in type 'Peserta'.
    src/types/peserta.ts:3:3 - 'nama' is declared here.
      3   nama: string;
  ```

Penyebab: `nama` dideklarasikan wajib (tanpa `?`) di interface `Peserta`, sehingga objek bertipe `Peserta` wajib memilikinya.
Perbaikan: tambahkan `nama: "Nama Baru"` ke objek.

Catatan: kode `TS2741` (properti wajib hilang) berbeda dengan `TS2322` (tipe tidak cocok / properti tak dikenal).

## Pembuktian TypeScript Menolak Data Salah

| Kasus | Kesalahan | Kode Error | Pesan Inti |
|---|---|---|---|
| A | `fase: "satu"` (string, harus number) | TS2322 | `Type 'string' is not assignable to type 'number'` |
| B | `umur={20}` (prop tak dikenal) | TS2322 | `Property 'umur' does not exist on type '...PesertaCardProps'` |
| C | `nama` tidak ditulis (wajib hilang) | TS2741 | `Property 'nama' is missing ... but required in type 'Peserta'` |

Kesimpulan:
- Ketiga kesalahan tertangkap TypeScript **SEBELUM** kode dijalankan.
- Error muncul di editor dan saat `npm run build` (tsc -b), **BUKAN** di browser pengguna.
- Dev server (`npm run dev`) tidak menampilkan error tipe, karena Vite hanya mentranspile TS → JS tanpa type-check. Type-check hanya terjadi saat build.
- `TS2322` = tipe tidak cocok / properti tak dikenal.
- `TS2741` = properti wajib hilang.

## Jawaban Soal 3 — Kapan pakai `Pick` vs `Omit`?

**`Pick`** dipakai kalau kamu hanya butuh **sedikit** properti dari tipe besar.
Contoh: `PesertaRingkas` hanya perlu `nama`, `sekolah`, `fase` — tidak perlu `email`, `status`, `role`. Hasilnya tipe lebih kecil dan fokus, serta otomatis menolak properti lain.

**`Omit`** dipakai kalau kamu butuh **hampir semua** properti, tetapi ingin membuang satu atau dua yang tidak relevan.
Contoh: `PesertaTanpaEmail` butuh `id`, `nama`, `sekolah`, `fase`, `status`, `role` — hanya `email` yang dibuang (misal untuk daftar publik / privasi).

**Aturan praktis:**
- Kalau yang **DIPAKAI** lebih sedikit dari yang **DIBUANG** → pilih **`Pick`**.
- Kalau yang **DIBUANG** lebih sedikit dari yang **DIPAKAI** → pilih **`Omit`**.

## Jawaban Soal 6 — Kenapa nomor melompat?

**Versi tidak murni (sementara):**
```tsx
let urutan = 0;

function NomorUrut() {
  urutan = urutan + 1;
  return <p>Nomor {urutan}</p>;
}
```

Hasil di browser (dev, StrictMode aktif): nomor **melompat** — muncul **melompat (bukan 1, 2, 3)**.
Di Console (F12): `render NomorUrut` muncul **2× per komponen** → bukti StrictMode render 2×.

**Penyebab melompat:**
StrictMode sengaja merender komponen dua kali saat development untuk mendeteksi efek samping. Karena `NomorUrut` mengubah variabel luar setiap render, nilainya bertambah 2× per komponen. Ini **FITUR, bukan bug**.

Catatan: di build produksi nomornya akan 1, 2, 3 (StrictMode mati), tetapi komponennya **TETAP salah secara prinsip** — render tidak boleh mengubah apa pun di luar dirinya.

**Perbaikan (murni):**
```tsx
interface NomorUrutProps {
  nomor: number;
}

function NomorUrut({ nomor }: NomorUrutProps) {
  return <p>Nomor {nomor}</p>;
}
```

Pemakaian: `<NomorUrut nomor={1} />`, `<NomorUrut nomor={2} />`, `<NomorUrut nomor={3} />`
Hasil: nomor stabil 1, 2, 3. Props sama → tampilan sama.

## Jawaban Soal 8 (Rabu): Kenapa key sebaiknya ID dari database, bukan indeks array?

`key` adalah pengenal unik tiap item agar React bisa melacak item mana yang sama saat daftar berubah (ditambah, dihapus, atau diurutkan ulang). ID dari database bersifat **stabil** — nilainya tidak berubah antar render, sehingga React bisa memindahkan elemen dengan benar meskipun posisinya berubah. Sebaliknya, **indeks array berbahaya**: jika item pertama dihapus, item kedua akan "berpindah" ke indeks 0, dan React akan salah mengira itu adalah item yang sama. Akibatnya, kondisi internal komponen (seperti state atau isi input) bisa menempel ke item yang salah. Karena itu, selalu gunakan ID unik dari data sebagai `key`.

# Halaman Daftar Jurnal

Deskripsi singkat: Halaman statis untuk menampilkan daftar jurnal harian peserta magang, lengkap dengan ringkasan status dan detail jurnal.

## Cara Menjalankan
1. `npm install`
2. `npm run dev`
3. Buka `http://localhost:5173`

## Struktur Folder
- `src/components/ui`: Komponen UI generik (Button, Alert, Kartu, Badge) yang tidak tahu tentang domain jurnal.
- `src/components/jurnal`: Komponen spesifik untuk jurnal (DaftarJurnal, JurnalCard, dll).
- `src/components/layout`: Komponen kerangka halaman (Header).
- `src/data`: Data tiruan statis.
- `src/types`: Definisi tipe TypeScript.
- `src/utils`: Fungsi bantuan (format tanggal, cx).

## 3 Keputusan Desain
1. **Pemisahan UI dan Jurnal**: Komponen di `components/ui` (seperti Button) dibuat sangat generik agar bisa dipakai ulang di halaman mana pun. Komponen di `components/jurnal` khusus menangani logika tampilan jurnal.
2. **Penanganan Field Null**: Semua field opsional seperti `hambatan`, `catatanMentor`, dan `linkCommit` diperiksa dengan *conditional rendering* (`&&`) agar tidak memunculkan teks "null" di layar.
3. **Pengurutan Tanpa Mutasi**: Fungsi `.sort()` di `DaftarJurnal` dilakukan pada salinan array (`[...jurnal]`) agar data asli dari API tidak berubah.