import { useState } from "react";
import { setAccessToken } from "../api/client";
import { JurnalSaya } from "../components/jurnal/JurnalSaya";
import { Button } from "../components/ui/Button";
import type { Peserta } from "../api/types";
import { LoginSementara } from "./LoginSementara";

export function HalamanUjiJurnal() {
  const [peserta, setPeserta] = useState<Peserta | null>(null);
  const [tampil, setTampil] = useState(true);

  if (peserta === null) {
    return <LoginSementara onBerhasil={setPeserta} />;
  }

  return (
    <section>
      <h2>Jurnal dari API (uji)</h2>
      <p>Login sebagai {peserta.nama}</p>
      <div>
        <Button ukuran="sm" variant="secondary" onClick={() => setTampil((t) => !t)}>
          {tampil ? "Lepas daftar" : "Pasang daftar"}
        </Button>
        <Button ukuran="sm" variant="secondary" onClick={() => setAccessToken(null)}>
          Hapus token (uji 401)
        </Button>
        <Button
          ukuran="sm"
          variant="danger"
          onClick={() => {
            setAccessToken(null);
            setPeserta(null);
          }}
        >
          Keluar
        </Button>
      </div>
      {tampil && <JurnalSaya />}
    </section>
  );
}