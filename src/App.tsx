import { HalamanLampiran } from "./pages/HalamanLampiran";
import { Navigate, Route, Routes } from "react-router";
import { LayoutAplikasi } from "./components/layout/LayoutAplikasi";
import { Halaman404 } from "./pages/Halaman404";
import { HalamanDetailJurnal } from "./pages/HalamanDetailJurnal";
import { HalamanJurnal } from "./pages/HalamanJurnal";
import { HalamanLogin } from "./pages/HalamanLogin";
import { HalamanProfil } from "./pages/HalamanProfil";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<HalamanLogin />} />

      {/* Rute tanpa path = rute layout: membungkus anak-anaknya dengan tampilan bersama */}
      <Route element={<LayoutAplikasi />}>
        <Route index element={<Navigate to="/jurnal" replace />} />
        <Route path="jurnal" element={<HalamanJurnal />} />
        <Route path="jurnal/:id" element={<HalamanDetailJurnal />} />
        <Route path="profil" element={<HalamanProfil />} />
        <Route path="jurnal/:id/lampiran/:nomor" element={<HalamanLampiran />} />
        {/* Menangkap semua URL lain */}
        <Route path="*" element={<Halaman404 />} />
      </Route>
    </Routes>
  );
}