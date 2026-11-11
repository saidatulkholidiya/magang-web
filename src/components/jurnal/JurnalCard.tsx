import { useState } from "react";
import type { Jurnal, StatusReview } from "../../types/jurnal";
import { formatTanggal } from "../../utils/format";
import StatusBadge from "./StatusBadge";
import { Button } from "../ui/Button";
import styles from "./JurnalCard.module.css";

interface JurnalCardProps {
  jurnal: Jurnal;
  onHapus: (id: number) => void;
  onUbahStatus: (id: number, status: StatusReview) => void;
}

export default function JurnalCard({ jurnal, onHapus, onUbahStatus }: JurnalCardProps) {
  const [bukaDetail, setBukaDetail] = useState(false);

  const adaDetail = Boolean(
    jurnal.hambatan || jurnal.catatanMentor || 
    (jurnal.lampiran && jurnal.lampiran.length > 0) || jurnal.linkCommit
  );

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.tanggal}>{formatTanggal(jurnal.createdAt)}</span>
        <StatusBadge status={jurnal.statusReview} />
      </div>
      
      <h3 className={styles.kegiatan}>{jurnal.kegiatan}</h3>
      
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px", flexWrap: "wrap" }}>
        {adaDetail && (
          <Button variant="secondary" ukuran="sm" onClick={() => setBukaDetail(!bukaDetail)}>
            {bukaDetail ? "Sembunyikan Detail" : "Tampilkan Detail"}
          </Button>
        )}
        
        <Button 
          variant="primary" 
          ukuran="sm" 
          onClick={() => onUbahStatus(jurnal.id, jurnal.statusReview === "belum" ? "sudah" : "belum")}
        >
          {jurnal.statusReview === "belum" ? "Tandai Sudah" : "Tandai Belum"}
        </Button>

        <Button variant="danger" ukuran="sm" onClick={() => onHapus(jurnal.id)}>
          Hapus
        </Button>
      </div>

      {bukaDetail && adaDetail && (
        <div>
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
        </div>
      )}
    </article>
  );
}