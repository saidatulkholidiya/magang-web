import { useSearchParams } from "react-router";
import { JurnalSaya } from "../components/jurnal/JurnalSaya";
import { bacaAngkaPositif } from "../utils/url";

export function HalamanJurnal() {
  const [params, setParams] = useSearchParams();
  
  // Baca ?halaman=N, kalau tidak valid (misal "abc") jadikan 1
  const halaman = bacaAngkaPositif(params.get("halaman")) ?? 1;

  function gantiHalaman(baru: number) {
    setParams({ halaman: String(baru) });
  }

  return (
    <section>
      <h2>Jurnal saya</h2>
      <JurnalSaya halaman={halaman} onGantiHalaman={gantiHalaman} />
    </section>
  );
}