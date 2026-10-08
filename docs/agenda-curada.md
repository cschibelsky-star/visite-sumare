# Agenda curada do Conheça Sumaré

A home e /eventos exibem somente eventos confirmados, com nome, local, datas válidas, link público e data da última conferência. Rascunhos e cancelados não são públicos. Eventos encerrados saem da agenda e dos destaques; o detalhe permanece marcado como encerrado.

## Operação

1. Descobrir candidatos nas fontes municipais de Cultura e Turismo, portal da Prefeitura e canais verificáveis dos organizadores.
2. Enviar candidato para /enviar-evento, com o link original. A submissão permanece pendente.
3. No admin, conferir edição/ano, datas, local, cancelamento, horário publicado e relevância. Registrar fonte e última conferência; só então aprovar.
4. Para cancelamento, alterar o evento para Cancelado. Para revalidação, atualizar a conferência e os dados.
5. Registros antigos sem confirmação ficam ocultos até revisão. Não preencher datas ou fontes automaticamente.

O acompanhamento no ChatGPT NÃO ingere eventos automaticamente nesta aplicação. Conectar esse radar requer um coletor com deduplicação, histórico de execução e envio autenticado de candidatos à fila. Não há publicação automática, integração de push, alteração da base ou migration nesta mudança.

## Validação

- npm run build --prefix apps/web
- node --test apps/shared/events.test.mjs tests/agenda-api.test.mjs
- git diff --check

As duas cópias de event-policy.js são necessárias pelos contextos Docker independentes de API e web. O teste impede divergência entre elas.

Base: release/conheca-sumare-prod-20260929. Home.jsx e services/api.js incluem as correções locais observadas na VPS em 08/10/2026. Não modificar a árvore de produção para instalar esta branch sem antes preservar e reconciliar os demais ajustes locais.
