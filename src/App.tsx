import { useState } from "react";
import { setAccessToken } from "./api/client";
import type { Peserta } from "./api/types";
import { FormLogin } from "./components/auth/FormLogin";
import { JurnalSaya } from "./components/jurnal/JurnalSaya";
import Header from "./components/layout/Header";
import { Button } from "./components/ui/Button";
import "./App.css";
//import { request } from "./api/client";
//import { keApiError } from "./api/errors";
//import { kodeLaporan, pesanUntukPengguna } from "./api/pesan";

export default function App() {
  const [peserta, setPeserta] = useState<Peserta | null>(null);

  function keluar() {
    setAccessToken(null);
    setPeserta(null);
  }

  if (peserta === null) {
    return (
      <main>
        <h1>Jurnal Magang</h1>
        <FormLogin onBerhasil={setPeserta} />
      </main>
    );
  }

  return (
    <main>
      <Header judul="Jurnal Magang" namaPeserta={peserta.nama} />
      <Button variant="secondary" ukuran="sm" onClick={keluar}>Keluar</Button>
      <JurnalSaya />
      {/* 
<div className="tombol-sementara">
  <p>Tombol SEMENTARA (hapus setelah uji):</p>
  <button type="button" onClick={() => setAccessToken("token-sembarang")}>Rusakkan token</button>
  <button
    type="button"
    onClick={() =>
      request("GET", "/uji-500").catch((err: unknown) => {
        const e = keApiError(err);
        window.alert(`${pesanUntukPengguna(e)} ${kodeLaporan(e) ?? ""}`);
      })
    }
  >
    Uji 500
  </button>
</div>
*/}
    </main>
  );
}