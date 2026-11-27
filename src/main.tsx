
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./components/auth/AuthProvider";
import "./index.css";
import App from "./App";

// Uji useAuth di luar Provider
// Pengujian berhasil menampilkan error:
// "useAuth harus dipakai di dalam AuthProvider"
//
// import { useAuth } from "./components/auth/useAuth";
//
// function UjiLuar() {
//   useAuth();
//   return null;
// }

// SOAL 7: Eksperimen identitas nilai Context
// Hasil pengujian:
// Dengan useMemo dan useCallback, UjiKonteks tidak
// render ulang saat induk berubah.
// Tanpa keduanya, UjiKonteks render ulang setiap klik.
//
// import { memo, useState } from "react";
// import { useAuth } from "./components/auth/useAuth";
//
// const UjiKonteks = memo(function UjiKonteks() {
//   useAuth();
//   console.log("SEMENTARA render UjiKonteks");
//   return null;
// });
//
// function Induk() {
//   const [hitung, setHitung] = useState(0);
//
//   return (
//     <>
//       <button onClick={() => setHitung(hitung + 1)}>
//         Render induk ({hitung})
//       </button>
//       <AuthProvider>
//         <UjiKonteks />
//         <App />
//       </AuthProvider>
//     </>
//   );
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
