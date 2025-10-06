export const API = "https://pokeapi.co/api/v2";

export function imageFrom(p: { id: number; sprites?: any }) {
  const oa = p?.sprites?.other?.["official-artwork"]?.front_default;
  if (oa) return oa;
  return p?.sprites?.front_default
    ?? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;
}
