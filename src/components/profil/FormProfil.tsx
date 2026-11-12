import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Button } from "../ui/Button";
import { validasiFormProfil } from "../../utils/validasiProfil";
import type { FormProfilErrors, FormProfilState } from "../../utils/validasiProfil";
import { cx } from "../../utils/cx";
import styles from "./FormProfil.module.css";

interface FormProfilProps {
  onSimpan: (data: FormProfilState) => void;
}

const NILAI_AWAL: FormProfilState = { nama: "", telepon: "" };

export function FormProfil({ onSimpan }: FormProfilProps) {
  const [nilai, setNilai] = useState<FormProfilState>(NILAI_AWAL);
  const [errors, setErrors] = useState<FormProfilErrors>({});

  const ubah: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setNilai((sebelumnya) => ({ ...sebelumnya, [name]: value }));
    setErrors((sebelumnya) => ({ ...sebelumnya, [name]: undefined })); // hapus error kolom yang diedit
  };

  const kirim: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const hasil = validasiFormProfil(nilai);
    setErrors(hasil);
    if (Object.keys(hasil).length > 0) return;

    onSimpan({ nama: nilai.nama.trim(), telepon: nilai.telepon.trim() });
    setNilai(NILAI_AWAL);
  };

  return (
  <form onSubmit={kirim} noValidate className={styles.form}>
    <div className={styles.kolom}>
      <label htmlFor="nama" className={styles.label}>Nama</label>
      <input
        id="nama"
        name="nama"
        value={nilai.nama}
        onChange={ubah}
        className={cx(styles.input, errors.nama && styles.inputError)}
        aria-invalid={errors.nama ? true : undefined}
        aria-describedby={errors.nama ? "nama-error" : undefined}
      />
      {errors.nama && (
        <p id="nama-error" role="alert" className={styles.error}>{errors.nama}</p>
      )}
    </div>

    <div className={styles.kolom}>
      <label htmlFor="telepon" className={styles.label}>Telepon (opsional)</label>
      <input
        id="telepon"
        name="telepon"
        type="tel"
        inputMode="numeric"
        value={nilai.telepon}
        onChange={ubah}
        className={cx(styles.input, errors.telepon && styles.inputError)}
        aria-invalid={errors.telepon ? true : undefined}
        aria-describedby={errors.telepon ? "telepon-error" : undefined}
      />
      {errors.telepon && (
        <p id="telepon-error" role="alert" className={styles.error}>{errors.telepon}</p>
      )}
    </div>

    <Button type="submit">Simpan profil</Button>
  </form>
);
}