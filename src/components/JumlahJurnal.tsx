export default function JumlahJurnal({ jumlah }: { jumlah: number }) {
  return (
    <div>
      {/* Menggunakan perbandingan boolean agar angka 0 tidak tampil */}
      {jumlah > 0 ? (
        <p>Ada {jumlah} jurnal.</p>
      ) : (
        <p>Tidak ada jurnal (0).</p>
      )}
    </div>
  );
}