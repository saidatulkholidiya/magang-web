import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { login } from "../../api/auth";
import { adalahKode, keApiError } from "../../api/errors";
import { kodeLaporan, pesanLogin } from "../../api/pesan";
import type { Peserta } from "../../api/types";
import { cx } from "../../utils/cx";
import { detailLoginKeErrors } from "../../utils/detailError";
import type { ErrorLogin } from "../../utils/detailError";
import { Alert } from "../ui/Alert";
import { Button } from "../ui/Button";
import styles from "./FormLogin.module.css";

interface FormLoginProps {
  onBerhasil: (peserta: Peserta) => void;
}

type StatusMasuk =
  | { status: "diam" }
  | { status: "masuk" }
  | { status: "gagal"; pesan: string; umum: string[]; laporan: string | null };

export function FormLogin({ onBerhasil }: FormLoginProps) {
  const [nilai, setNilai] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<ErrorLogin>({});
  const [statusMasuk, setStatusMasuk] = useState<StatusMasuk>({ status: "diam" });

  const ubah: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setNilai((sebelumnya) => ({ ...sebelumnya, [name]: value }));
    setErrors((sebelumnya) => ({ ...sebelumnya, [name]: undefined }));
  };

  const kirim: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (statusMasuk.status === "masuk") return;

    setErrors({});
    setStatusMasuk({ status: "masuk" });

    login(nilai.email.trim(), nilai.password)
      .then(onBerhasil)
      .catch((err: unknown) => {
        if (adalahKode(err, "VALIDATION_ERROR")) {
          const { kolom, umum } = detailLoginKeErrors(err.detail);
          setErrors(kolom);
          setStatusMasuk({ status: "gagal", pesan: pesanLogin(err), umum, laporan: kodeLaporan(err) });
          return;
        }
        const error = keApiError(err);
        setStatusMasuk({ status: "gagal", pesan: pesanLogin(error), umum: [], laporan: kodeLaporan(error) });
      });
  };

  return (
    <form onSubmit={kirim} noValidate className={styles.form}>
      <h2>Login</h2>

      <div className={styles.kolom}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={nilai.email}
          onChange={ubah}
          className={cx(styles.input, errors.email && styles.inputError)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" role="alert" className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.kolom}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={nilai.password}
          onChange={ubah}
          className={cx(styles.input, errors.password && styles.inputError)}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && <p id="password-error" role="alert" className={styles.error}>{errors.password}</p>}
      </div>

      {statusMasuk.status === "gagal" && (
        <Alert tipe="bahaya">
          <p>{statusMasuk.pesan}</p>
          {statusMasuk.umum.map((u) => <p key={u}>{u}</p>)}
          {statusMasuk.laporan !== null && <p>{statusMasuk.laporan}</p>}
        </Alert>
      )}

      <Button type="submit" disabled={statusMasuk.status === "masuk"}>
        {statusMasuk.status === "masuk" ? "Masuk..." : "Login"}
      </Button>
    </form>
  );
}