# Home Conheça Sumaré — revisão isolada

## Continuidade — logo aprovado em 20/10/2026

Localizado o arquivo independente `Logo Conheça Sumaré isolado.png`. O histórico
confirma aprovação do logo completo com marcador/orquídea para página/vídeo e
do ícone para aplicativo em 20/10. O PNG original foi integrado no cabeçalho,
rodapé e ilustração do celular da Home, sem redesenho ou alteração dos bytes.
A base azul-marinho em CSS mantém legível a parte branca do lettering.
`public/brand/provenance.json` registra a origem e o SHA-256, verificado pelo
teste HTTP junto à decodificação do logo nas três larguras.

Esse logo aprovado posteriormente substitui o lettering provisório; a imagem
histórica continua referência para a composição, não para o símbolo antigo.
Fotografias finais continuam pendentes: o inventário `image_sources.json` do
acervo legado marca as imagens como `provisoria_referencia`, sem fonte ou
autorização registrada. Não houve substituição por fotografias inventadas.

## Problema confirmado em 21/10/2026

O PR #3 tinha somente o serviço web e respostas 503 fixas para `/api/` e
`/uploads/`. O build Vite não comprovava eventos ou imagens locais.

## Correção

- Nginx encaminha API e uploads exclusivamente ao serviço `api:8787` da revisão.
- API e frontend reutilizam o código existente; a estrutura da Home foi preservada.
- Capturas comprovaram foto ausente em História e barra PWA sobreposta no desktop:
  a foto reutiliza o asset Pró-Memória existente; a barra é ocultada somente na
  Home acima de 760px, preservando a navegação móvel e as demais páginas.
- Compose possui projeto/rede próprios, porta apenas em `127.0.0.1:18995`, sem
  porta pública da API, redes externas, volumes de produção ou arquivos `.env`.
- Banco e uploads usam tmpfs descartável. O inicializador cria quatro eventos
  sintéticos (confirmado, publicado, pendente e encerrado) e um PNG de teste.
- Token administrativo aleatório permanece somente na memória do processo.
  A revisão permite navegação pública e confirma que rotas administrativas
  continuam protegidas; não fornece login administrativo para operadores.

## Executar

Usar checkout separado da branch do PR. Nunca combinar este Compose com o de
produção ou HML já existente:

```sh
docker compose -f docker-compose.home-review.yml up --build --wait
docker compose -f docker-compose.home-review.yml exec -T web nginx -t
npm install --no-audit --no-fund
npm install --no-save --no-audit --no-fund playwright@1.56.1
npx playwright install --with-deps chromium
node tests/home-review.mjs
docker compose -f docker-compose.home-review.yml down
```

O workflow usa Ubuntu 24.04 por compatibilidade com o navegador. O teste usa o
Nginx e a API reais, sem interceptar a chamada de eventos. Capturas completas e
`results.json` ficam no artefato `home-review-<commit>` em Actions.

## Evidências e limites

Workflow [39660904073](https://github.com/cschibelsky-star/visite-sumare/actions/runs/39660904073),
head `46a2438fe24082e862748168552d578fdf980763`: build e revisão isolada
aprovados. Nginx validado, API/eventos/uploads/rotas/proteção administrativa
aprovados. Larguras 390/1024/1440 sem overflow horizontal, erros JavaScript,
requisições com falha ou imagens HTML quebradas. Artefato
`12372539310` contém três PNGs e `results.json` (o nome usa o commit de merge
sintético do teste do PR, não significa merge efetivo).

### Comparação visual efetivamente realizada

Capturas inspecionadas nas três resoluções contra a imagem aprovada. Hierarquia
das seções, hero com celular, categorias, atrativos, negócios e rodapé estão
presentes. Em 1440px a página permanece centralizada com largura máxima de
1024px; em 390px os blocos empilham e a navegação PWA permanece disponível.

Problemas comprovados corrigidos nesta revisão: foto vazia de História e
barra PWA cobrindo conteúdo no desktop. Novas verificações foram incluídas;
a execução de CI posterior à correção deve ser conferida no PR.

**Homologação visual ainda não aprovada:** alguns arquivos servidos com HTTP
200 são imagens provisórias com texto e formas geométricas, não as fotos da
referência (Cultura, Eventos, Mapa, Gastronomia, Hospedagem e partes do hero).
O cabeçalho/rodapé usam lettering em vez do logo completo da referência;
os cards de negócios usam gradientes. O HTTP 200 não valida fidelidade visual.
Não substituir por imagens inventadas ou recortar o mockup como foto. São
necessários assets finais oficiais confirmados para esses elementos.

Teste local da API: aprovado (quatro eventos, PNG, 404 e rejeição de acesso
administrativo/escrita sem autenticação). Sintaxe dos scripts Node: aprovada.
Build CI do primeiro commit de correção: aprovado. A primeira tentativa do
job de navegador falhou na instalação do Playwright em Ubuntu 26.04, antes de
iniciar os serviços; corrigida com runner Ubuntu 24.04.

O teste de navegador verifica as larguras 390, 1024 e 1440, evento elegível,
ausência de evento pendente/encerrado na Home, overflow, erros JavaScript,
orientação PWA, rotas React, imagem da agenda e proteção de `/admin`.
Falhas das imagens externas são registradas separadamente no relatório.

Referência visual: imagem aprovada `Descubra Sumaré_ Turismo e Oportunidades(2).png`.
Comparar cabeçalho/logo, hero, celular, categorias, atrativos, história,
negócios e rodapé. Capturas com dados sintéticos não comprovam curadoria ou
dados reais de produção. Teste funcional aprovado não equivale a homologação
visual. Não realizar merge ou publicação antes da homologação.
