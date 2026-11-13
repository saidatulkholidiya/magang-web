// src/hooks/usePenundaan.ts
import { useEffect, useState } from "react";

export function usePenundaan<T>(nilai: T, ms: number): T {
  const [tertunda, setTertunda] = useState(nilai);

  useEffect(() => {
    const pengatur = setTimeout(() => setTertunda(nilai), ms);
    return () => clearTimeout(pengatur);
  }, [nilai, ms]);

  return tertunda;
}