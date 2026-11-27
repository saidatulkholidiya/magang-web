
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ApiError } from "../../api/errors";
import { login, logout, pulihkanSesi } from "../../api/auth";

import {
  setSesiBerakhirHandler,
  setAccessToken,
} from "../../api/client";

import { AuthContext } from "./context";
import type { StatusAuth } from "./context";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<StatusAuth>({
    status: "memeriksa",
  });

  // Memulihkan sesi saat aplikasi pertama kali dibuka
  useEffect(() => {
    let aktif = true;

    async function periksaSesi() {
      try {
        const pengguna = await pulihkanSesi();

        if (!aktif) return;

        if (pengguna) {
          setAuth({ status: "masuk", pengguna });
        } else {
          setAuth({ status: "keluar" });
        }
      } catch (err) {
        if (!aktif) return;

        setAuth({
          status: "galat",
          error:
            err instanceof ApiError
              ? err
              : new ApiError("Gagal memulihkan sesi", 0, "UNKNOWN_ERROR"),
        });
      }
    }

    void periksaSesi();

    return () => {
      aktif = false;
    };
  }, []);

  // Menangani sesi yang berakhir
  useEffect(() => {
    setSesiBerakhirHandler(() => {
      setAccessToken(null);
      setAuth({ status: "keluar" });
    });

    return () => {
      setSesiBerakhirHandler(null);
    };
  }, []);

  // Login
  const masuk = useCallback(
    async (email: string, password: string) => {
      const pengguna = await login(email, password);
      setAuth({ status: "masuk", pengguna });
    },
    []
  );

  // Logout
  const keluar = useCallback(async () => {
    try {
      await logout();
    } finally {
      setAccessToken(null);
      setAuth({ status: "keluar" });
    }
  }, []);

  // Nilai Context dijaga agar identitasnya stabil
  const nilai = useMemo(
    () => ({ auth, masuk, keluar }),
    [auth, masuk, keluar]
  );

  return (
    <AuthContext.Provider value={nilai}>
      {children}
    </AuthContext.Provider>
  );
}

// EKSPERIMEN SOAL 7 TANPA useMemo DAN useCallback
// Sudah diuji: objek Context baru dibuat setiap render,
// sehingga konsumen yang menggunakan memo ikut render ulang.
//
// const masuk = async (email: string, password: string) => {
//   const pengguna = await login(email, password);
//   setAuth({ status: "masuk", pengguna });
// };
//
// const keluar = async () => {
//   try {
//     await logout();
//   } catch {
//     // Tetap akhiri sesi di klien.
//   }
//   setAccessToken(null);
//   setAuth({ status: "keluar" });
// };
//
// const nilai = { auth, masuk, keluar };
