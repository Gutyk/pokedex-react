export type BasicListItem = { name: string; url: string };

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: BasicListItem[];
};

export type PokemonType = { slot: number; type: { name: string; url: string } };

export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    other?: {
      ["official-artwork"]?: { front_default: string | null };
    };
    front_default: string | null;
  };
  types: PokemonType[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
};

export type Species = {
  id: number;
  evolution_chain: { url: string };
  color: { name: string };
  habitat: { name: string } | null;
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
};

export type EvolutionChain = {
  chain: {
    species: { name: string; url: string };
    evolves_to: EvolutionChain["chain"][];
  };
};
