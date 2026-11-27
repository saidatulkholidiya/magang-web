import { useNavigate } from "react-router";
import { FormLogin } from "../components/auth/FormLogin";

export function HalamanLogin() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Jurnal Magang</h1>

      <FormLogin
        onBerhasil={() => navigate("/jurnal", { replace: true })}
      />
    </main>
  );
}