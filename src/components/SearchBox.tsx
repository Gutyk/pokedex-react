import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const [q, setQ] = useState("");
  const nav = useNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) nav(`/pokemon/${q.trim().toLowerCase()}`);
      }}
      className="row"
    >
      <input
        className="input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar por nome ou id…"
      />
      <button className="btn" type="submit">Buscar</button>
    </form>
  );
}
