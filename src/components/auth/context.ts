
import type { ApiError } from "../../api/errors";
import type { Peserta } from "../../api/types";

export type StatusAuth =
  | { status: "memeriksa" }
  | { status: "keluar" }
  | { status: "masuk"; pengguna: Peserta }
  | { status: "galat"; error: ApiError };

export interface NilaiAuth {
  auth: StatusAuth;
  masuk: (email: string, password: string) => Promise<void>;
  keluar: () => Promise<void>;
}

import { createContext } from "react";

export const AuthContext = createContext<NilaiAuth | null>(null);
