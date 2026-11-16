import { useState } from "react";
import type { Jurnal, StatusReview } from "../../types/jurnal";
import type { role } from "../../types/peserta";
import { formatTanggal } from "../../utils/format";
import StatusBadge from "./StatusBadge";
import { PanelReview } from "./PanelReview";
import { Button } from "../ui/Button";
import styles from "./JurnalCard.module.css";

interface JurnalCardProps {
  jurnal: Jurnal;
  role: role;
  onHapus: (id: number) => void;
  onUbahReview: (id: number, status: StatusReview, catatan: string | null) => void;
}

export default function JurnalCard({ jurnal, role, onHapus, onUbahReview }: JurnalCardProps) {
  const [bukaDetail, setBukaDetail] = useState(false);
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);
  const [bukaReview, setBukaReview] = useState(false);

  const adaDetail = Boolean(
    jurnal.hambatan ||
      jurnal.catatanMentor ||
      (jurnal.lampiran && jurnal.lampiran.length > 0) ||
      jurnal.linkCommit
  );

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.tanggal}>{formatTanggal(jurnal.createdAt)}</span>
        <StatusBadge status={jurnal.statusReview} />
      </div>

      <h3 className={styles.kegiatan}>{jurnal.kegiatan}</h3>

      <div className={styles.aksi}>
        {adaDetail && (
          <Button variant="secondary" ukuran="sm" onClick={() => setBukaDetail(!bukaDetail)}>
            {bukaDetail ? "Sembunyikan Detail" : "Tampilkan Detail"}
          </Button>
        )}

        {role === "mentor" && !bukaReview && (
          <Button variant="primary" ukuran="sm" onClick={() => setBukaReview(true)}>
            Review
          </Button>
        )}

        {konfirmasiHapus ? (
          <>
            <span className={styles.konfirmasi}>Yakin?</span>
            <Button variant="danger" ukuran="sm" onClick={() => onHapus(jurnal.id)}>
              Ya
            </Button>
            <Button variant="secondary" ukuran="sm" onClick={() => setKonfirmasiHapus(false)}>
              Batal
            </Button>
          </>
        ) : (
          <Button variant="danger" ukuran="sm" onClick={() => setKonfirmasiHapus(true)}>
            Hapus
          </Button>
        )}
      </div>

      {role === "mentor" && bukaReview && (
        <PanelReview
          catatanAwal={jurnal.catatanMentor ?? null}
          onBatal={() => setBukaReview(false)}
          onSimpan={(status, catatan) => {
            onUbahReview(jurnal.id, status, catatan);
            setBukaReview(false);
            setBukaDetail(true); // buka detail supaya catatan langsung tampil
          }}
        />
      )}

      {bukaDetail && adaDetail && (
        <div>
          {jurnal.hambatan && (
            <p className={styles.hambatan}>
              <strong>Hambatan:</strong> {jurnal.hambatan}
            </p>
          )}
          {jurnal.catatanMentor && (
            <p className={styles.mentor}>
              <strong>Catatan mentor:</strong> {jurnal.catatanMentor}
            </p>
          )}
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