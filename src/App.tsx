import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <header className="header">
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Link to="/" className="brand">Pokedex</Link>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
