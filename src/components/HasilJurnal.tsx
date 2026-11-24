import DaftarJurnal from "./jurnal/DaftarJurnal";
import type { Jurnal } from "../api/types";

type HasilJurnalProps =
  | { status: "memuat" }
  | { status: "berhasil"; data: readonly Jurnal[] }
  | { status: "gagal"; pesan: string };

function tidakMelakukanApaApa() {
}

export default function HasilJurnal(props: HasilJurnalProps) {
  switch (props.status) {
    case "memuat":
      return <p>Memuat data...</p>;

    case "berhasil":
      return (
        <DaftarJurnal
          jurnal={props.data}
          role="peserta"
          pesanKosong="Belum ada jurnal yang tersedia."
          onHapus={tidakMelakukanApaApa}
          onUbahReview={tidakMelakukanApaApa}
        />
      );

    case "gagal":
      return <p role="alert">Gagal: {props.pesan}</p>;
  }
}