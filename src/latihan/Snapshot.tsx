import { useState } from "react";

export default function Snapshot() {
  const [jumlah, setJumlah] = useState(0);

  function tambahTigaSalah() {
    setJumlah(jumlah + 1); // 0 + 1 = 1
    console.log("Nilai di dalam fungsi:", jumlah);
    setJumlah(jumlah + 1); // 0 + 1 = 1
    setJumlah(jumlah + 1); // 0 + 1 = 1
    // Hasil akhir: 1 (bukan 3), karena `jumlah` di render ini masih 0.
  }

  function tambahTigaBenar() {
    setJumlah((j) => j + 1); // Pakai nilai terbaru
    setJumlah((j) => j + 1);
    setJumlah((j) => j + 1);
    // Hasil akhir: 3
  }

  return (
    <div>
      <p>Nilai: {jumlah}</p>
      <button onClick={tambahTigaSalah}>+3 (Salah)</button>
      <button onClick={tambahTigaBenar}>+3 (Benar)</button>
    </div>
  );
}