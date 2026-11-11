import type { Jurnal } from "../types/jurnal";
import DaftarJurnal from "./jurnal/DaftarJurnal";

type HasilJurnalProps =
  | { status: "memuat" }
  | { status: "berhasil"; data: Jurnal[] }
  | { status: "gagal"; pesan: string };

export default function HasilJurnal(props: HasilJurnalProps) {
  switch (props.status) {
    case "memuat":
      return <p>Memuat data...</p>;
    case "berhasil":
      return (
        <DaftarJurnal 
          jurnal={props.data} 
          onHapus={(id) => console.log("Hapus:", id)} 
          onUbahStatus={(id, status) => console.log("Ubah:", id, status)} 
        />
      );
    case "gagal":
      return <p role="alert">Gagal: {props.pesan}</p>;
  }
}