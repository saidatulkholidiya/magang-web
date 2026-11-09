function App() {
  const nama = "Saidatul Kholidiya";
  const tahun = new Date().getFullYear();

  return (
    <>
      <div className="container">
        <h1>Halo, {nama}!</h1>
        <p>Tahun {tahun}, 1 + 1 = {1 + 1}</p>
        
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" placeholder="Masukkan email" />
        
        <p style={{ color: "crimson", fontWeight: "bold" }}>
          Ini teks merah menggunakan inline style.
        </p>
      </div>
    </>
  );
}

export default App;