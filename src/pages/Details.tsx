import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PokeAPI } from "../lib/pokeapi";
import { imageFrom } from "../lib/utils";

function flattenEvolution(node: any, acc: string[] = []) {
  acc.push(node.species.name);
  for (const child of node.evolves_to || []) flattenEvolution(child, acc);
  return acc;
}

export default function Details() {
  const { idOrName } = useParams();

  const pq = useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: () => PokeAPI.pokemon(idOrName!),
  });

  const spq = useQuery({
    queryKey: ["species", idOrName],
    queryFn: () => PokeAPI.species(idOrName!),
    enabled: !!pq.data,
  });

  const evq = useQuery({
    queryKey: ["evolution", spq.data?.evolution_chain?.url],
    queryFn: () => PokeAPI.evolutionByUrl(spq.data!.evolution_chain.url),
    enabled: !!spq.data?.evolution_chain?.url,
  });

  if (pq.isLoading) return <p>Carregando…</p>;
  if (pq.isError || !pq.data) return <p>Não encontrei esse Pokémon.</p>;

  const p = pq.data;
  const flavor = spq.data?.flavor_text_entries?.find((f) => f.language.name === "en")?.flavor_text?.replace(/\s+/g, " ");
  const evo = evq.data ? flattenEvolution(evq.data.chain) : [];

  return (
    <article>
      <Link to="/" className="back">← Voltar</Link>

      <div style={{display:'flex', gap:24, flexWrap:'wrap', alignItems:'center', marginTop:8}}>
        <img src={imageFrom(p)} alt={p.name} style={{width:224, height:224, objectFit:'contain'}} />
        <div>
          <h1 className="title">{p.name} <span className="mono">#{p.id}</span></h1>
          <p className="subtle" style={{textAlign:'left'}}>
            {flavor ?? "Sem descrição disponível em EN."}
          </p>
          <div style={{marginTop:8, fontSize:14}}>
            <strong>Tipos:</strong> {p.types.map(t => t.type.name).join(", ")}<br/>
            <strong>Altura:</strong> {p.height/10} m • <strong>Peso:</strong> {p.weight/10} kg
          </div>
        </div>
      </div>

      <section style={{marginTop:16}}>
        <h2 style={{fontSize:20, fontWeight:700, marginBottom:8}}>Stats</h2>
        <ul className="stats">
          {p.stats.map(s => (
            <li key={s.stat.name} className="stat">
              <span style={{textTransform:'capitalize'}}>{s.stat.name}</span>
              <span className="mono">{s.base_stat}</span>
            </li>
          ))}
        </ul>
      </section>

      {evo.length > 0 && (
        <section style={{marginTop:16}}>
          <h2 style={{fontSize:20, fontWeight:700, marginBottom:8}}>Cadeia de Evolução</h2>
          <div style={{display:'flex', flexWrap:'wrap', gap:8, alignItems:'center'}}>
            {evo.map((name, i) => (
              <span key={name} style={{textTransform:'capitalize'}}>
                <Link to={`/pokemon/${name}`} className="back">{name}</Link>
                {i < evo.length - 1 && " → "}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
