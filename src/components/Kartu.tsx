import type { ReactNode } from "react";

interface KartuProps {
  judul: string;
  children: ReactNode;
}

export default function Kartu({ judul, children }: KartuProps) {
  return (
    <section className="kartu">
      <h2>{judul}</h2>
      <div>{children}</div>
    </section>
  );
}