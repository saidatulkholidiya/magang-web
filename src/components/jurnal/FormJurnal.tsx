import { useState, useRef } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Button } from "../ui/Button";
import { validasiFormJurnal } from "../../utils/validasiJurnal";
import type { FormJurnalErrors, FormJurnalState } from "../../utils/validasiJurnal";
import type { JurnalBaru } from "../../types/jurnal";

interface FormJurnalProps {
  onTambah: (data: JurnalBaru) => void;
}

const NILAI_AWAL: FormJurnalState = { kegiatan: "", hambatan: "", linkCommit: "" };

export function FormJurnal({ onTambah }: FormJurnalProps) {
  const [nilai, setNilai] = useState<FormJurnalState>(NILAI_AWAL);
  const [errors, setErrors] = useState<FormJurnalErrors>({});
  const refKegiatan = useRef<HTMLTextAreaElement>(null);

  const ubah: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setNilai((sebelumnya) => ({ ...sebelumnya, [name]: value }));
    setErrors((sebelumnya) => ({ ...sebelumnya, [name]: undefined }));
  };

  const kirim: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const hasil = validasiFormJurnal(nilai);
    setErrors(hasil);

    if (Object.keys(hasil).length > 0) {
      if (hasil.kegiatan && refKegiatan.current) {
        refKegiatan.current.focus();
      }
      return;
    }

    onTambah({
      kegiatan: nilai.kegiatan.trim(),
      hambatan: nilai.hambatan.trim() || null,
      linkCommit: nilai.linkCommit.trim() || null,
    });
    setNilai(NILAI_AWAL);
  };

  return (
    <form onSubmit={kirim} noValidate style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <div>
        <label htmlFor="kegiatan">Kegiatan hari ini</label>
        <textarea
          ref={refKegiatan}
          id="kegiatan"
          name="kegiatan"
          value={nilai.kegiatan}
          onChange={ubah}
          aria-invalid={errors.kegiatan ? true : undefined}
          aria-describedby={errors.kegiatan ? "kegiatan-error" : undefined}
          style={{ width: "100%", padding: "8px", minHeight: "80px" }}
        />
        {errors.kegiatan && <p id="kegiatan-error" role="alert" style={{ color: "red", fontSize: "0.9rem", margin: "4px 0" }}>{errors.kegiatan}</p>}
      </div>

      <div>
        <label htmlFor="hambatan">Hambatan (opsional)</label>
        <textarea
          id="hambatan"
          name="hambatan"
          value={nilai.hambatan}
          onChange={ubah}
          style={{ width: "100%", padding: "8px" }}
        />
        {errors.hambatan && <p role="alert" style={{ color: "red" }}>{errors.hambatan}</p>}
      </div>

      <div>
        <label htmlFor="linkCommit">Link commit (opsional)</label>
        <input
          id="linkCommit"
          name="linkCommit"
          value={nilai.linkCommit}
          onChange={ubah}
          style={{ width: "100%", padding: "8px" }}
        />
        {errors.linkCommit && <p role="alert" style={{ color: "red" }}>{errors.linkCommit}</p>}
      </div>

      <Button type="submit">Simpan Jurnal</Button>
    </form>
  );
}