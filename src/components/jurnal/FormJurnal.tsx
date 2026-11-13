import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Button } from "../ui/Button";
import { cx } from "../../utils/cx";
import { validasiFormJurnal } from "../../utils/validasiJurnal";
import type { FormJurnalErrors, FormJurnalState } from "../../utils/validasiJurnal";
import type { JurnalBaru } from "../../types/jurnal";
import styles from "./FormJurnal.module.css";

interface FormJurnalProps {
  onTambah: (data: JurnalBaru) => void;
}

const NILAI_AWAL: FormJurnalState = { kegiatan: "", hambatan: "", linkCommit: "" };

export function FormJurnal({ onTambah }: FormJurnalProps) {
  const [nilai, setNilai] = useState<FormJurnalState>(NILAI_AWAL);
  const [errors, setErrors] = useState<FormJurnalErrors>({});

  const ubah: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setNilai((sebelumnya) => ({ ...sebelumnya, [name]: value }));
    setErrors((sebelumnya) => ({ ...sebelumnya, [name]: undefined }));
  };

  const kirim: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const hasil = validasiFormJurnal(nilai);
    setErrors(hasil);
    if (Object.keys(hasil).length > 0) return;

    onTambah({
      kegiatan: nilai.kegiatan.trim(),
      hambatan: nilai.hambatan.trim() || null,
      linkCommit: nilai.linkCommit.trim() || null,
    });
    setNilai(NILAI_AWAL);
  };

  return (
    <form onSubmit={kirim} noValidate className={styles.form}>
      <div className={styles.kolom}>
        <label htmlFor="kegiatan" className={styles.label}>Kegiatan hari ini</label>
        <textarea
          id="kegiatan"
          name="kegiatan"
          value={nilai.kegiatan}
          onChange={ubah}
          className={cx(styles.input, errors.kegiatan && styles.inputError)}
          aria-invalid={errors.kegiatan ? true : undefined}
          aria-describedby={errors.kegiatan ? "kegiatan-error" : undefined}
        />
        {errors.kegiatan && (
          <p id="kegiatan-error" role="alert" className={styles.error}>{errors.kegiatan}</p>
        )}
      </div>

      <div className={styles.kolom}>
        <label htmlFor="hambatan" className={styles.label}>Hambatan (opsional)</label>
        <textarea
          id="hambatan"
          name="hambatan"
          value={nilai.hambatan}
          onChange={ubah}
          className={cx(styles.input, errors.hambatan && styles.inputError)}
        />
        {errors.hambatan && <p role="alert" className={styles.error}>{errors.hambatan}</p>}
      </div>

      <div className={styles.kolom}>
        <label htmlFor="linkCommit" className={styles.label}>Link commit (opsional)</label>
        <input
          id="linkCommit"
          name="linkCommit"
          value={nilai.linkCommit}
          onChange={ubah}
          className={cx(styles.input, errors.linkCommit && styles.inputError)}
        />
        {errors.linkCommit && <p role="alert" className={styles.error}>{errors.linkCommit}</p>}
      </div>

      <Button type="submit">Simpan Jurnal</Button>
    </form>
  );
}