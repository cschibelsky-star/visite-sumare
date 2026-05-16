# Visite Sumaré App — Next.js 14 + Tailwind + Supabase-ready

Site responsivo mobile-first para turismo de Sumaré, inspirado no visual do “Visite Sumaré App”.

## O que foi incluído

- Next.js 14 com App Router e TypeScript.
- Tailwind CSS com cores oficiais do projeto: `#1A6B2F` e `#F5C000`.
- Fonte Nunito via `next/font/google`.
- Cantos arredondados com padrão de 16px e cards premium.
- Navegação inferior: Home, Mapa, Explorar, Eventos e Guia.
- Hero visual com ilustração local da Orquídea de Sumaré em SVG.
- Filtros de categorias: Naturais, Históricos e Negócios.
- Hotéis Fildi, Jaguary e Marcan com sistema de estrelas.
- Eventos com calendário dinâmico para a Festa da Mandioca.
- Área administrativa para inserir, editar e excluir atrativos, hotéis e eventos.
- API Route `/api/atrativos` lendo de um arquivo JSON local que simula o banco PostgreSQL.
- API administrativa `/api/admin/content` para persistir no JSON durante desenvolvimento.
- Cliente Supabase configurado em `lib/supabase.ts` e schema SQL em `supabase/schema.sql`.

## Como executar

```bash
npm install
npm run dev
```

Acesse:

- Site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
- PIN demonstrativo: `1234`
- API: `http://localhost:3000/api/atrativos`

## Observação importante sobre dados

O arquivo `data/turismo.json` é um mock local para prototipação. Em produção, substitua a escrita em arquivo por Supabase/PostgreSQL, pois plataformas como Vercel não persistem alterações em JSON local após deploy.

## Contatos usados no MVP

O projeto mantém dois contatos para evitar conflito de informação pública:

- Secretaria Municipal de Cultura e Turismo: Rua 16 de dezembro, 85, Centro, telefone (19) 3873-9469, e-mail smct@sumare.sp.gov.br.
- Endereço institucional da Prefeitura/Sistema Nacional de Cultura: Rua Dom Barreto, 1303, Centro, Sumaré/SP.

## Migração para Supabase

1. Crie um projeto no Supabase.
2. Execute `supabase/schema.sql` no SQL Editor.
3. Preencha `.env.local` com:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
ADMIN_PIN=troque-este-pin
```

4. Troque a camada de dados em `lib/localdb.ts` por chamadas ao Supabase.

## Próximos passos recomendados

- Autenticação real no admin com Supabase Auth.
- Upload de imagens para Supabase Storage.
- Geolocalização em tempo real com Leaflet ou Mapbox.
- SEO institucional com páginas individuais por atrativo.
- Integração no domínio/subdomínio da Prefeitura.
