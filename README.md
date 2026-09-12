# Sumaré Explore — V1 Independente

Primeira versão independente do app, sem Base44 SDK, Base44 auth ou CDN Base44.

## Estrutura
- `apps/web`: React + Vite + React Router + Leaflet
- `apps/api`: API Node.js sem framework, persistindo em JSON (`apps/api/data/db.json`)

## Rodar
```bash
npm install
cp apps/api/.env.example apps/api/.env
npm run dev
```

Web: http://localhost:5173
API: http://localhost:8787

## Admin
Defina `ADMIN_TOKEN` em `apps/api/.env`. Em desenvolvimento, o fallback é `sumare-admin-dev`.
A tela `/admin/login` pede esse token.

## Notas
Esta V1 prioriza independência, paridade funcional e uma base simples para evolução. O próximo passo recomendado é migrar a persistência JSON para PostgreSQL e adicionar autenticação por usuário/sessão.
