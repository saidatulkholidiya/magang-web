// src/hooks/useLocalStorage.ts
import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  kunci: string,
  nilaiAwal: T,
  valid: (data: unknown) => data is T
) {
  const [nilai, setNilai] = useState<T>(() => {
    try {
      const tersimpan = localStorage.getItem(kunci);
      if (tersimpan === null) return nilaiAwal;

      const data: unknown = JSON.parse(tersimpan);
      return valid(data) ? data : nilaiAwal;
    } catch {
      return nilaiAwal;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(kunci, JSON.stringify(nilai));
    } catch {
      // penyimpanan penuh atau diblokir: abaikan
    }
  }, [kunci, nilai]);

  return [nilai, setNilai] as const;
}