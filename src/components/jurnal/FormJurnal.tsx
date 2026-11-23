import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { adalahKode, keApiError } from "../../api/errors";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import type { JurnalBaru } from "../../api/types";
import { cx } from "../../utils/cx";
import { detailKeErrors } from "../../utils/detailError";
import { validasiFormJurnal } from "../../utils/validasiJurnal";
import type { FormJurnalErrors, FormJurnalState } from "../../utils/validasiJurnal";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import styles from "./FormJurnal.module.css";

interface FormJurnalProps {
  onTambah: (data: JurnalBaru) => Promise<void>;
}

type StatusKirim =
  | { status: "diam" }
  | { status: "menyimpan" }
  | { status: "gagal"; pesan: string; umum: string[]; laporan: string | null };

const NILAI_AWAL: FormJurnalState = { kegiatan: "", hambatan: "", linkCommit: "" };

export function FormJurnal({ onTambah }: FormJurnalProps) {
  const [nilai, setNilai] = useState<FormJurnalState>(NILAI_AWAL);
  const [errors, setErrors] = useState<FormJurnalErrors>({});
  const [statusKirim, setStatusKirim] = useState<StatusKirim>({ status: "diam" });

  const kegiatanRef = useRef<HTMLTextAreaElement>(null);
  const hambatanRef = useRef<HTMLTextAreaElement>(null);
  const linkCommitRef = useRef<HTMLInputElement>(null);

  // Fokus ke kolom pertama yang salah, urut dari atas ke bawah
  function fokusKePertama(e: FormJurnalErrors) {
    if (e.kegiatan) kegiatanRef.current?.focus();
    else if (e.hambatan) hambatanRef.current?.focus();
    else if (e.linkCommit) linkCommitRef.current?.focus();
  }

  const ubah: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setNilai((sebelumnya) => ({ ...sebelumnya, [name]: value }));
    setErrors((sebelumnya) => ({ ...sebelumnya, [name]: undefined }));
  };

  const kirim: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (statusKirim.status === "menyimpan") return; // pagar kedua selain tombol nonaktif

    const hasil = validasiFormJurnal(nilai);
    setErrors(hasil);
    if (Object.keys(hasil).length > 0) {
      fokusKePertama(hasil);
      return;
    }

    setStatusKirim({ status: "menyimpan" });

    onTambah({
      kegiatan: nilai.kegiatan.trim(),
      hambatan: nilai.hambatan.trim() || undefined, // dihilangkan, bukan null: dokumen tidak menerima null
      linkCommit: nilai.linkCommit.trim() || undefined,
    })
      .then(() => {
        setNilai(NILAI_AWAL);
        setErrors({});
        setStatusKirim({ status: "diam" });
      })
      .catch((err: unknown) => {
        if (adalahKode(err, "VALIDATION_ERROR")) {
          const { kolom, umum } = detailKeErrors(err.detail);
          setErrors(kolom);
          fokusKePertama(kolom);
          setStatusKirim({ status: "gagal", pesan: pesanUntukPengguna(err), umum, laporan: kodeLaporan(err) });
          return;
        }
        const error = keApiError(err);
        setStatusKirim({ status: "gagal", pesan: pesanUntukPengguna(error), umum: [], laporan: kodeLaporan(error) });
      });
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

      {statusKirim.status === "gagal" && (
        <Alert tipe="bahaya">
          <p>{statusKirim.pesan}</p>
          {statusKirim.umum.map((u) => <p key={u}>{u}</p>)}
          {statusKirim.laporan !== null && <p>{statusKirim.laporan}</p>}
        </Alert>
      )}

      <Button type="submit" disabled={statusKirim.status === "menyimpan"}>
        {statusKirim.status === "menyimpan" ? "Menyimpan..." : "Simpan Jurnal"}
      </Button>
    </form>
  );
}