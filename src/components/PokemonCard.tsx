import { Link } from "react-router-dom";
import { imageFrom } from "../lib/utils";
import type { Pokemon } from "../types/pokemon";

type Props = { data: Pokemon };

export default function PokemonCard({ data }: Props) {
  return (
    <Link to={`/pokemon/${data.id}`} className="card">
      <img
        src={imageFrom(data)}
        alt={data.name}
        className="img"
        loading="lazy"
      />
      <div className="name">{data.name}</div>
      <div className="subtle">
        {data.types.map(t => t.type.name).join(" • ")}
      </div>
    </Link>
  );
}
