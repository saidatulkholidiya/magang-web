
import { Navigate, Route, Routes } from "react-router";

import { pesanUntukPengguna } from "./api/pesan";
import { useAuth } from "./components/auth/useAuth";
import { LayoutAplikasi } from "./components/layout/LayoutAplikasi";

import { Alert } from "./components/ui/Alert";
import { Button } from "./components/ui/Button";

import { HalamanLampiran } from "./pages/HalamanLampiran";
import { Halaman404 } from "./pages/Halaman404";
import { HalamanDetailJurnal } from "./pages/HalamanDetailJurnal";
import { HalamanJurnal } from "./pages/HalamanJurnal";
import { HalamanLogin } from "./pages/HalamanLogin";
import { HalamanProfil } from "./pages/HalamanProfil";

import "./App.css";

export default function App() {
  const { auth } = useAuth();

  // Sementara sampai Kamis: tahan tampilan sampai status sesi diketahui
  if (auth.status === "memeriksa") {
    return <p role="status">Memeriksa sesi...</p>;
  }

  // Tampilkan pesan jika pemeriksaan sesi mengalami kegagalan
  if (auth.status === "galat") {
    return (
      <Alert tipe="bahaya">
        <p>{pesanUntukPengguna(auth.error)}</p>
        <Button
          ukuran="sm"
          onClick={() => window.location.reload()}
        >
          Muat ulang
        </Button>
      </Alert>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<HalamanLogin />} />

      <Route element={<LayoutAplikasi />}>
        <Route index element={<Navigate to="/jurnal" replace />} />
        <Route path="jurnal" element={<HalamanJurnal />} />
        <Route path="jurnal/:id" element={<HalamanDetailJurnal />} />
        <Route path="profil" element={<HalamanProfil />} />
        <Route
          path="jurnal/:id/lampiran/:nomor"
          element={<HalamanLampiran />}
        />
      </Route>

      <Route path="*" element={<Halaman404 />} />
    </Routes>
  );
}
