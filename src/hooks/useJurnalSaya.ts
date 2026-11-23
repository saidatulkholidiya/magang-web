import { useCallback, useEffect, useState } from "react";
import { ambilJurnalSaya } from "../api/jurnal";
import { keApiError } from "../api/errors";
import type { ApiError } from "../api/errors";
import type { StatusPermintaan } from "./status";

type HasilJurnal = Awaited<ReturnType<typeof ambilJurnalSaya>>;

type Selesai =
  | { kunci: string; status: "berhasil"; data: HasilJurnal }
  | { kunci: string; status: "gagal"; error: ApiError };

export function useJurnalSaya(halaman: number) {
  const [versi, setVersi] = useState(0);
  const [selesai, setSelesai] = useState<Selesai | null>(null);

  const kunci = `${halaman}:${versi}`;

  useEffect(() => {
    const pengendali = new AbortController();

    ambilJurnalSaya({ halaman, signal: pengendali.signal })
      .then((data) => setSelesai({ kunci, status: "berhasil", data }))
      .catch((err: unknown) => {
        if (pengendali.signal.aborted) return;
        setSelesai({ kunci, status: "gagal", error: keApiError(err) });
      });

   return () => pengendali.abort();
  }, [halaman, kunci]);

  const hasil: StatusPermintaan<HasilJurnal> =
  selesai !== null && selesai.kunci === kunci ? selesai : { status: "memuat" };
  const muatUlang = useCallback(() => setVersi((v) => v + 1), []);

  return { hasil, muatUlang };
}