# Agenda unificada no HML

vitrine-ai-pro#95 implementa o contrato canônico e a curadoria PHP sobre o head do #94. O adapter deste PR conserva a UI React do #1 e usa esse feed para listagem/detalhes quando VITE_CALENDAR_FEED_URL estiver configurado. O feed não recebe tokens nem possui fallback para dados antigos; falha de rede mostra o estado de erro já existente.

HML PHP/PWA: https://p000095.hml.vitrineiapro.com.br/eventos
HML React/PWA: https://p000096.hml.vitrineiapro.com.br/eventos

Ambos exibem eventos da mesma lista curada. Importar candidatos em /admin/events.php no PHP (usuário curadoria, token HML existente), conferir e aprovar. Eventos existentes nas bases React não são copiados automaticamente: podem ser exportados pela listagem administrativa e importados com origem visite-sumare. Confirmed sem recibo administrativo não se converte silenciosamente em publicação. Cancelamento acontece no admin canônico para remover o evento dos dois clientes.

O compose novo sobe somente uma nova web e reutiliza a API HML saudável para as outras áreas. Não reinicia essa API, não altera seus volumes nem modifica as árvores PHP/React anteriores. A agenda pública sempre vem do PHP; o admin React continua ligado à API de origem e suas alterações precisam passar pela curadoria canônica.

Sem variável de build, comportamento anterior preservado. Sem merge/deploy de produção. Coletor futuro alimentará candidatos autenticados, sem publicar; notificações precisam de outbox após gravação, chave id+revision, cancelamentos e consentimento. Ver docs/calendar-contract.md no PR PHP para os pontos de integração.

Validação: node --test apps/shared/events.test.mjs tests/agenda-api.test.mjs tests/calendar-contract.test.mjs; build Vite com variável canônica; smoke HTTP no HML.
