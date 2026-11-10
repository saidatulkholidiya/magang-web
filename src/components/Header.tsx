export default function Header({ judul }: { judul: string }) {
  return (
    <header style={{ borderBottom: "2px solid #eee", paddingBottom: "10px", marginBottom: "20px" }}>
      <h1>{judul}</h1>
    </header>
  );
}