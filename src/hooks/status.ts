import type { ApiError } from "../api/errors";

// Discriminated union: status menentukan properti yang ada
export type StatusPermintaan<T> =
  | { status: "memuat" }
  | { status: "berhasil"; data: T }
  | { status: "gagal"; error: ApiError };