import { useId, useState } from "react";
import type { ChangeEventHandler } from "react";
import { Button } from "../ui/Button";
import { cx } from "../../utils/cx";
import { validasiReview } from "../../utils/validasiReview";
import type { StatusReview } from "../../types/jurnal";
import styles from "./PanelReview.module.css";

interface PanelReviewProps {
  catatanAwal: string | null;
  onSimpan: (status: StatusReview, catatan: string | null) => void;
  onBatal: () => void;
}

export function PanelReview({ catatanAwal, onSimpan, onBatal }: PanelReviewProps) {
  const idCatatan = useId();
  const idError = useId();
  const [catatan, setCatatan] = useState(catatanAwal ?? "");
  const [error, setError] = useState<string | null>(null);

  const ubah: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setCatatan(e.target.value);
    setError(null); // error hilang saat mulai mengedit
  };

  function kirim(status: StatusReview) {
    const pesan = validasiReview(status, catatan);
    if (pesan !== null) {
      setError(pesan);
      return;
    }
    onSimpan(status, catatan.trim() || null); // kosong menjadi null, seperti API
  }

  return (
    <div className={styles.panel}>
      <label htmlFor={idCatatan} className={styles.label}>
        Catatan mentor
      </label>
      <textarea
        id={idCatatan}
        value={catatan}
        onChange={ubah}
        className={cx(styles.input, error && styles.inputError)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? idError : undefined}
      />
      {error && (
        <p id={idError} role="alert" className={styles.error}>
          {error}
        </p>
      )}

      <div className={styles.aksi}>
        <Button ukuran="sm" onClick={() => kirim("sudah")}>
          Tandai sudah direview
        </Button>
        <Button variant="secondary" ukuran="sm" onClick={() => kirim("belum")}>
          Kembalikan ke belum
        </Button>
        <Button variant="secondary" ukuran="sm" onClick={onBatal}>
          Batal
        </Button>
      </div>
    </div>
  );
}