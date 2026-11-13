import { useState } from "react";
import { FormProfil } from "../components/profil/FormProfil";
import { Alert } from "../components/ui/Alert";
import type { FormProfilState } from "../utils/validasiProfil";
import styles from "./LatihanProfil.module.css";

export function LatihanProfil() {
  const [tersimpan, setTersimpan] = useState<FormProfilState | null>(null);

  return (
    <section className={styles.bagian}>
      <h2>Form Profil</h2>
      <FormProfil onSimpan={setTersimpan} />
      {tersimpan && (
        <div className={styles.hasil}>
          <Alert tipe="sukses">
            Tersimpan: {tersimpan.nama}
            {tersimpan.telepon !== "" && `, ${tersimpan.telepon}`}
          </Alert>
        </div>
      )}
    </section>
  );
}