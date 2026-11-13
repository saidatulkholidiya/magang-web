import { useEffect, useRef } from "react";

interface PencarianJurnalProps {
  nilai: string;
  onUbah: (nilai: string) => void;
}

export function PencarianJurnal({ nilai, onUbah }: PencarianJurnalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function tekanTombol(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", tekanTombol);
    //console.log("pasang");
    return () => //{
      //console.log("lepas");
      window.removeEventListener("keydown", tekanTombol);
    //};
  }, []);

  return (
    <label>
      Cari kegiatan
      <input
        ref={inputRef}
        type="search"
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
        placeholder='Tekan "/" untuk mencari'
      />
    </label>
  );
}