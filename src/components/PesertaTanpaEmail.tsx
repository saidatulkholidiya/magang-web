import type { Peserta } from "../types/peserta";

type PesertaTanpaEmailProps = Omit<Peserta, "email">;

export default function PesertaTanpaEmail(props: PesertaTanpaEmailProps) {
  return (
    <article>
      <h3>{props.nama}</h3>
      <p>
        {props.sekolah} · Fase {props.fase} · {props.status}
      </p>
    </article>
  );
}