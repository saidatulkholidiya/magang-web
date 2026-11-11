import type { Jurnal } from "../../types/jurnal";
import { formatTanggal } from "../../utils/format";
import StatusBadge from "./StatusBadge";
import styles from "./JurnalCard.module.css";

interface JurnalCardProps {
  jurnal: Jurnal;
}

export default function JurnalCard({ jurnal }: JurnalCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.tanggal}>{formatTanggal(jurnal.createdAt)}</span>
        <StatusBadge status={jurnal.statusReview} />
      </div>
      
      <h3 className={styles.kegiatan}>{jurnal.kegiatan}</h3>
      
      {jurnal.hambatan && <p className={styles.hambatan}><strong>Hambatan:</strong> {jurnal.hambatan}</p>}
      {jurnal.catatanMentor && <p className={styles.mentor}><strong>Catatan mentor:</strong> {jurnal.catatanMentor}</p>}
      
      <div className={styles.footer}>
        {jurnal.lampiran && jurnal.lampiran.length > 0 && (
          <span className={styles.lampiran}>Lampiran ({jurnal.lampiran.length})</span>
        )}
        {jurnal.linkCommit && (
          <a href={jurnal.linkCommit} target="_blank" rel="noreferrer" className={styles.commit}>
            Lihat commit
          </a>
        )}
      </div>
    </article>
  );
}