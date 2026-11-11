import { useState } from "react";
import { Button } from "../components/ui/Button";

export default function Penghitung() {
  const [jumlah, setJumlah] = useState(0);

  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px" }}>
      <h3>Jumlah: {jumlah}</h3>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button onClick={() => setJumlah(jumlah + 1)}>Tambah (+)</Button>
        <Button variant="secondary" onClick={() => setJumlah(jumlah > 0 ? jumlah - 1 : 0)}>Kurang (-)</Button>
        <Button variant="danger" onClick={() => setJumlah(0)}>Reset</Button>
      </div>
    </div>
  );
}