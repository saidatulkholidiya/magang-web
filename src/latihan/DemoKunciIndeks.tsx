import { useState } from "react";

export default function DemoKunciIndeks() {
  const [item, setItem] = useState(["Satu", "Dua", "Tiga"]);

  return (
    <div style={{ padding: "20px" }}>
      <ul>
        {item.map((nama, indeks) => (
          <li key={indeks}> {/* BUG: pakai indeks */}
            {nama} <input placeholder="catatan" />
          </li>
        ))}
      </ul>
      <button onClick={() => setItem(item.slice(1))}>Hapus yang pertama</button>
    </div>
  );
}