import { useState } from "react";
import type { FormEventHandler } from "react";
import { login } from "../api/auth";
import { keApiError } from "../api/errors";
import { pesanUntukPengguna } from "../api/pesan";
import { Button } from "../components/ui/Button";
import type { Peserta } from "../api/types";

interface LoginSementaraProps {
  onBerhasil: (peserta: Peserta) => void;
}

export function LoginSementara({ onBerhasil }: LoginSementaraProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState<string | null>(null);

  const kirim: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setPesan(null);
    login(email, password)
      .then(onBerhasil)
      .catch((err: unknown) => setPesan(pesanUntukPengguna(keApiError(err))));
  };

  return (
    <form onSubmit={kirim}>
      <h2>Login sementara (form lengkap dibuat Jumat)</h2>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <Button type="submit">Login</Button>
      {pesan !== null && <p role="alert">{pesan}</p>}
    </form>
  );
}