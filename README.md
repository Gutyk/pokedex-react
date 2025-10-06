# Pokédex (React + Vite + TypeScript)

App simples que consome a [PokéAPI](https://pokeapi.co/) com lista paginada, busca por nome/ID e página de detalhes com stats, descrição e cadeia de evolução.

## 🚀 Stack
- **React 18** + **TypeScript**
- **Vite** (dev server & build)
- **React Router DOM** (rotas)
- **@tanstack/react-query** (fetch/cache/estado de loading/erro)
- CSS simples

## 📦 Instalação
```bash
npm i
```

## ▶️ Dev
```bash
npm run dev
```

## 🔗 Endpoints usados

- GET /pokemon?offset=&limit= — lista paginada (nomes/URLs)
- GET /pokemon/{id|name} — detalhes (sprites, tipos, stats, medidas)
- GET /pokemon-species/{id|name} — descrição e URL da cadeia de evolução
- GET {evolution_chain.url} — árvore de evolução (recursiva)
