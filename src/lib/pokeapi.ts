import { API } from "./utils";
import type { PokemonListResponse, Pokemon, Species, EvolutionChain } from "../types/pokemon";

async function get<T>(path: string) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`Erro ${res.status} em ${path}`);
  return (await res.json()) as T;
}

export const PokeAPI = {
  list: (offset = 0, limit = 24) =>
    get<PokemonListResponse>(`/pokemon?offset=${offset}&limit=${limit}`),

  pokemon: (idOrName: string | number) =>
    get<Pokemon>(`/pokemon/${idOrName}`),

  species: (idOrName: string | number) =>
    get<Species>(`/pokemon-species/${idOrName}`),

  evolutionByUrl: (fullUrl: string) => (async () => {
    const res = await fetch(fullUrl);
    if (!res.ok) throw new Error(`Erro ${res.status} em evolution`);
    return (await res.json()) as EvolutionChain;
  })(),
};
