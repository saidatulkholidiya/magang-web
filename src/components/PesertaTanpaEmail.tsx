import type { Peserta } from "../api/types";

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