import type { Jurnal } from "../types/jurnal";
import DaftarJurnal from "./DaftarJurnal";

// Tipe Union: Properti "status" menentukan properti apa yang wajib ada
type HasilJurnalProps =
  | { status: "memuat" }
  | { status: "berhasil"; data: Jurnal[] }
  | { status: "gagal"; pesan: string };

// Gunakan `props` utuh (bukan destructuring di parameter) agar switch bisa mendeteksi tipe
export default function HasilJurnal(props: HasilJurnalProps) {
  switch (props.status) {
    case "memuat":
      return <p>Memuat data...</p>;
      
    case "berhasil":
      // Di sini TypeScript tahu pasti props.data ada
      return <DaftarJurnal jurnal={props.data} />;
      
    case "gagal":
      // Di sini TypeScript tahu pasti props.pesan ada
      return <p role="alert">Gagal: {props.pesan}</p>;
  }
}