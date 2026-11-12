import { useState } from "react";
import { FormProfil } from "../components/profil/FormProfil";
import type { FormProfilState } from "../utils/validasiProfil";

export function LatihanProfil() {
  const [tersimpan, setTersimpan] = useState<FormProfilState | null>(null);

  return (
    <section>
      <h2>Form Profil</h2>
      <FormProfil onSimpan={setTersimpan} />
      {tersimpan && (
        <p role="status">
          Tersimpan: {tersimpan.nama}
          {tersimpan.telepon !== "" && `, ${tersimpan.telepon}`}
        </p>
      )}
    </section>
  );
}