import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { PokeAPI } from "../lib/pokeapi";
import SearchBox from "../components/SearchBox";
import PokemonCard from "../components/PokemonCard";

export default function Home() {
  const [page, setPage] = useState(0);
  const limit = 24;
  const offset = page * limit;

  const listQ = useQuery({
    queryKey: ["list", offset, limit],
    queryFn: () => PokeAPI.list(offset, limit),
    staleTime: 60_000,
    keepPreviousData: true,
  });

  const [details, setDetails] = useState<any[]>([]);

  const names = useMemo(() => listQ.data?.results?.map(r => r.name) ?? [], [listQ.data]);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (names.length === 0) { setDetails([]); return; }
      const res = await Promise.all(names.map(n => PokeAPI.pokemon(n)));
      if (!cancelled) setDetails(res);
    })();
    return () => { cancelled = true; };
  }, [names.join(",")]);

  return (
    <section>
      <SearchBox />

      {listQ.isLoading && <p>Carregando…</p>}
      {listQ.isError && <p>Ops, não consegui carregar a lista.</p>}

      <div className="grid">
        {details.map((p) => <PokemonCard key={p.id} data={p} />)}
      </div>

      <div className="row" style={{justifyContent:'space-between', marginTop:16}}>
        <button
          className="btn"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          ← Anterior
        </button>
        <span>Página {page + 1}</span>
        <button
          className="btn"
          onClick={() => setPage((p) => p + 1)}
          disabled={!listQ.data?.next}
        >
          Próxima →
        </button>
      </div>
    </section>
  );
}
