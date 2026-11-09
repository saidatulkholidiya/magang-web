interface NomorUrutProps {
  nomor: number;
}

export default function NomorUrut({ nomor }: NomorUrutProps) {
  return <p>Nomor {nomor}</p>;
}