import type { role } from "../../types/peserta";
import styles from "./SaklarPeran.module.css";

interface SaklarPeranProps {
  role: role;
  onUbah: (role: role) => void;
}

const PILIHAN: readonly { nilai: role; label: string }[] = [
  { nilai: "peserta", label: "Peserta" },
  { nilai: "mentor", label: "Mentor" },
];

export function SaklarPeran({ role, onUbah }: SaklarPeranProps) {
  return (
    <fieldset className={styles.saklar}>
      <legend>Peran</legend>
      {PILIHAN.map((p) => (
        <label key={p.nilai} className={styles.pilihan}>
          <input
            type="radio"
            name="peran"
            value={p.nilai}
            checked={role === p.nilai}
            onChange={() => onUbah(p.nilai)}
          />
          {p.label}
        </label>
      ))}
    </fieldset>
  );
}