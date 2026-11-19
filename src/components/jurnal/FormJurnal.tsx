import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Button } from "../ui/Button";
import { cx } from "../../utils/cx";
import { validasiFormJurnal } from "../../utils/validasiJurnal";
import type { FormJurnalErrors, FormJurnalState } from "../../utils/validasiJurnal";
import type { JurnalBaru } from "../../api/types";
import styles from "./FormJurnal.module.css";

interface FormJurnalProps {
  onTambah: (data: JurnalBaru) => void;
}

const NILAI_AWAL: FormJurnalState = { kegiatan: "", hambatan: "", linkCommit: "" };

export function FormJurnal({ onTambah }: FormJurnalProps) {
  const [nilai, setNilai] = useState<FormJurnalState>(NILAI_AWAL);
  const [errors, setErrors] = useState<FormJurnalErrors>({});

  // Pegangan ke tiap kolom, supaya fokus bisa dipindah ke kolom pertama yang salah
  const kegiatanRef = useRef<HTMLTextAreaElement>(null);
  const hambatanRef = useRef<HTMLTextAreaElement>(null);
  const linkCommitRef = useRef<HTMLInputElement>(null);

  const ubah: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setNilai((sebelumnya) => ({ ...sebelumnya, [name]: value }));
    setErrors((sebelumnya) => ({ ...sebelumnya, [name]: undefined }));
  };

  const kirim: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const hasil = validasiFormJurnal(nilai);
    setErrors(hasil);

    // Fokus ke kolom pertama yang salah, urut dari atas ke bawah
    if (hasil.kegiatan) {
      kegiatanRef.current?.focus();
      return;
    }
    if (hasil.hambatan) {
      hambatanRef.current?.focus();
      return;
    }
    if (hasil.linkCommit) {
      linkCommitRef.current?.focus();
      return;
    }

    onTambah({
      kegiatan: nilai.kegiatan.trim(),
      hambatan: nilai.hambatan.trim() || undefined,
      linkCommit: nilai.linkCommit.trim() || undefined,
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
          ref={kegiatanRef}
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
          ref={hambatanRef}
          value={nilai.hambatan}
          onChange={ubah}
          className={cx(styles.input, errors.hambatan && styles.inputError)}
          aria-invalid={errors.hambatan ? true : undefined}
          aria-describedby={errors.hambatan ? "hambatan-error" : undefined}
        />
        {errors.hambatan && (
          <p id="hambatan-error" role="alert" className={styles.error}>{errors.hambatan}</p>
        )}
      </div>

      <div className={styles.kolom}>
        <label htmlFor="linkCommit" className={styles.label}>Link commit (opsional)</label>
        <input
          id="linkCommit"
          name="linkCommit"
          ref={linkCommitRef}
          value={nilai.linkCommit}
          onChange={ubah}
          className={cx(styles.input, errors.linkCommit && styles.inputError)}
          aria-invalid={errors.linkCommit ? true : undefined}
          aria-describedby={errors.linkCommit ? "linkCommit-error" : undefined}
        />
        {errors.linkCommit && (
          <p id="linkCommit-error" role="alert" className={styles.error}>{errors.linkCommit}</p>
        )}
      </div>

      <Button type="submit">Simpan Jurnal</Button>
    </form>
  );
}