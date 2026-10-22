# Situação atual — autorização e integração em 22/10/2026

O usuário confirmou expressamente: **“todas as fotos que estão no meu drive podem ser usadas”**. Esta confirmação resolve a pendência de autorização do acervo do Drive descrita no registro histórico abaixo. Não equivale a aceite visual nem autoriza merge/publicação.

Cinco fotografias identificadas foram integradas como WebP locais: vista aérea do centro/Matriz, fachada da Matriz, Banda Sinfônica (imagem temática), fachada do ParkCity Sumaré e Orquidário Municipal. Originais, fontes e hashes registrados em `apps/web/public/media/drive/provenance.json`. Não se afirma que o autor das fotos seja o usuário; o crédito individual não foi informado. Nenhuma imagem foi gerada/reconstruída.

Aplicações: Cultura/Mapa/hero/História usam imagens identificadas; card ParkCity passa a usar sua fachada; mockup do telefone usa o Orquidário e legenda correspondente. Foto da banda é temática, não documental do próximo evento. O React, os serviços, a API e o seed não foram substituídos.

Permanecem pendentes fotografias correspondentes para Gastronomia, Hospedagem e os cards PPG/3M/FEMSA. A foto do lago FIMI0004 foi recuperada, mas o local ainda não foi confirmado. A existência de autorização não resolve identificação geográfica nem correspondência visual. A composição preserva as seções da referência, mas não corresponde integralmente às fotografias da referência (Pró-Memória/feira etc.). Sem aceite visual integral.

A busca por nome via filtro de metadados encontrou o ParkCity na pasta de materiais `1no4kozS72ctQ3R9bIIovK5H6XigDvv7C`, fora de Conheca Sumare/Passaporte; houve recuperação da foto de fachada e interior e do Orquidário. Fotos duplicadas não foram integradas. O interior foi validado e reservado, sem uso neste commit.

Testes adicionam integridade SHA-256 das cinco derivações e decodificação das fotos em backgrounds CSS em 390/1024/1440. O teste legado foi renomeado de “Official photo” para “Legacy JPEG delivery”: entrega JPEG não comprova autorização. O resultado final do CI e a inspeção das novas capturas devem ser registrados após a execução. Produção preservada; PR draft.

---

## Registro histórico da descoberta, anterior à autorização

# Recuperação do acervo da Home — 22/10/2026

Base examinada: `91ae7985f67960d72243c7aa8b5c36b90011fbae`, PR #3, branch `fix/conheca-home-approved-visual-20261020`.

## Resultado

Foram localizados 59 JPEGs e 7 vídeos na pasta [Fotos pontos históricos](https://drive.google.com/drive/folders/1H_9XmlhIbjlRcPjVFVa9hs2sxwAOe9Xa), além de seis fotografias em [Banda Sinfônica/fotos da banda](https://drive.google.com/drive/folders/1eqiuoJlAZc0qmaYVZPe_l6pVeoqkYpwl). Quatro originais foram baixados por conexão autenticada, decodificados e inspecionados visualmente; dimensões e SHA-256 seguem abaixo. Os demais foram apenas inventariados; não se afirma que todos sirvam à Home.

**Nenhuma fotografia nova integrada ao diretório público.** Acesso e procedência do acervo não equivalem à autorização de reutilização exigida pelo pedido. O conector confirmou o proprietário `smct.sumare25` para FIMI0054, a pasta FOTOS e a foto da banda. Não retornou termo/licença de reutilização. O nome da conta é indício de acervo municipal, não comprovação isolada de titularidade autoral ou permissão comercial.

## Originais recuperados e inspecionados

| Arquivo original | Conteúdo observado e possível uso | Dimensões | SHA-256 |
|---|---|---|---|
| [FIMI0054.JPG](https://drive.google.com/file/d/1VM3MZc4B0Z6crH6yCIlRSoTFoq_O1y-U/view) | Vista aérea da Igreja Matriz e do centro; candidata para Cultura/História/Mapa/hero. | 3840 × 2160 | `dc2edc085283c82170e7ddae83c6f6834f1bfec7608634f78a038e6691066cfe` |
| [FIMI0004.JPG](https://drive.google.com/file/d/19QVPXMV6TfNvLTlS2eYE0izAnpkNuIcd/view) | Vista aérea de lago e área arborizada; local exato ainda precisa ser identificado pelo acervo. | 3840 × 2160 | `af0fc736d718b3c43e771f284c060beb2ab589a1690440ca5971ef421ca7bffa` |
| [WhatsApp Image 2025-04-03 at 13.30.20.jpeg](https://drive.google.com/file/d/1n_eV1Rm7YUUoc1-KnfV1ReNxq0fZfJlZ/view) | Fachada da Igreja Matriz; candidata para Cultura/História. | 4096 × 3072 | `e47293677226c6944b2005e7b9a2ed0d40c78ae1591c7487f59a0d9035876836` |
| [IMG-20250519-WA0100.jpg](https://drive.google.com/file/d/1ML_qaqi_axlaZousLaYl8d_1OE5tCKm2/view) | Apresentação de banda/orquestra no acervo Banda Sinfônica; candidata temática para Cultura/Eventos, sem vincular a evento futuro. | 1280 × 960 | `962f4c81c9d9753564267c7b3db1e5ec5f93bb9a613b1c9b77aec56d1303204b` |

Todos: **autorização pendente; não integrar antes de comprovação**. Crédito do fotógrafo/titular ainda não confirmado. Os hashes identificam os bytes recuperados, não certificam direitos.

## Outras buscas realizadas

- [Conheca Sumare](https://drive.google.com/drive/folders/16WRoMQcWcMR1-srU944OySk3LDZUeOEn): contém Passaporte; esta subpasta contém duas artes JPEG e um vídeo, não o conjunto fotográfico da Home.
- [Feira de Artesanato](https://drive.google.com/drive/folders/1YWc5Ppq7NG0vIxBsBg0jtmvyuGLfktaE): arte PNG, PSDs, vídeo e subpasta de vídeos; não foi encontrada fotografia final autorizada na listagem direta. Material de junho de 2025 não comprova programação atual.
- Buscas Drive por Fildi e hospedagem não localizaram arquivos; gastronomia retornou item sem relação com o projeto. Busca por nomes contendo autoriz/cessão/licen não localizou termo associado ao acervo. Isso não prova inexistência de documentos fora da indexação ou em pastas não acessíveis.
- Examinadas árvores do visite-sumare atual, Factory main, vitrine-ai-pro main e branches históricas backup/conheca-sumare-hml-validada-20260930 (5d591a45) e feature/conheca-sumare-reference-home-20261008 (429b304e). As duas árvores históricas PHP não contêm binários fotográficos próprios; referenciar uma URL não recupera o original.
- [Inventário legado da Factory](https://github.com/cschibelsky-star/VitrineAI-FACTORY-ENTERPRISE-X/blob/main/products/guia-digital-turismo/implementacao_4_3/data/image_sources.json): entradas marcadas `provisoria_referencia`, fonte/crédito vazios e `imagem_autorizada: nao`. Não promover esses arquivos por terem nome capa-real.jpg ou por passarem em verificação JPEG.

## Pendências exatas e recebimento autorizado

| Área | Disponível | Falta para integrar |
|---|---|---|
| Cultura/História/Mapa/parte do hero | FIMI0054 e fachada da Matriz, bytes válidos | Titular confirmar permissão de uso no Conheça Sumaré, crédito e recorte; aceite da seleção conforme referência |
| Natureza/hero | FIMI0004, bytes válidos | Identificação do local, crédito e autorização |
| Eventos/Cultura | Seis JPEGs da banda; um inspecionado | Autorização/credito e seleção temática; não associar a evento futuro sem comprovação |
| Gastronomia/Hospedagem | Nenhum substituto confirmado nas buscas | Originais dos estabelecimentos ou acervo autorizado, com nome/local, crédito e permissão |
| Negócios (ParkCity, PPG, 3M, Coca-Cola FEMSA) | Cards continuam provisórios | Arquivo original apropriado de cada operação local e autorização; não usar foto genérica de outra unidade |
| Foto histórica municipal da URL antiga | PR documenta HTTP 403/hostname_not_allowed | Não é necessária para acessar as novas fotos do Drive; se desejada especificamente, titular pode fornecer o binário no Drive já conectado, com autorização. Não remover bloqueios de host por conveniência |

Mecanismo já funcional: disponibilizar os originais e o comprovante/licença no Google Drive conectado (pasta Conheca Sumare ou pasta do acervo), compartilhar somente com a conta já conectada quando necessário e informar o link. Não é necessário tornar a pasta pública, abrir permissão anyone/writer, fornecer senha ou criar novo conector. Para os quatro arquivos recuperados, o binário já está acessível: a pendência é autorização e crédito, não upload. Uma confirmação do responsável com poderes sobre o acervo deve identificar os arquivos/IDs e permitir uso no site, incluindo recorte e otimização, com crédito exigido.

## Homologação e preservação

Este commit registra descoberta e rastreabilidade; não altera React, CSS, imagens públicas, API, autenticação, serviços, volumes ou produção. PR permanece draft, sem merge/publicação. Sem substituição visual, não há nova composição para comparar com a referência aprovada; comparação visual final permanece pendente. CI técnico deve ser lido como regressão funcional, não como autorização ou aceite visual. A execução 39758338584 pertence ao commit anterior 871f7b95 e não certifica mudanças posteriores.

## Inventário de JPEGs em Fotos pontos históricos

| Nome | ID Drive |
|---|---|
| IMG_20260113_183748.jpg | 1QpL1vnWrqa3ugUVEGrOAhukWbTfdeAyW |
| IMG_20260113_183812_1.jpg | 1yBUpa5KuV_W7xmQpiVc2ePZWelAwJlis |
| IMG_20260114_094952.jpg | 1rVGZH8SW8Oaz3SK7MUrqwzjX3dF8OtGx |
| IMG_20260114_095017.jpg | 1zCPwzMRgbfP7qF60k0JymYf2KBwsiWpL |
| IMG_20260114_095100.jpg | 1QQR_JEhCxM69IP9PiulfSHZ7woK71eDr |
| IMG_20260114_095119.jpg | 1Fpre-w6Ft19QDEOyRBruTvsyoSyOo8P7 |
| IMG_20260114_095126.jpg | 1x3gEgC7DRAPHSSRbANREYVDZ2Zz5jfmY |
| IMG_20260114_095205.jpg | 1kFNZE6F0y2NseIbQ-tqQMajPJHNt_BhY |
| IMG_20260114_095613.jpg | 1hKtK6apCxW-CyLs1vSybMQn8KvYgay8a |
| IMG_20260114_095615.jpg | 1gmJBUlkn_2Hz1ipYZnehaO_JNUuK3Huf |
| IMG_20260114_095701.jpg | 1J1hx-eqMyhjsPXVYMyLjnBrkAU7v3H1m |
| IMG_20260114_095926.jpg | 1QPU8fJQh51wOUC2KZQvlzWrHfexpzhpU |
| IMG_20260114_100036.jpg | 13LhSzDIVuXzoWycNcP857hZTAd4k0slR |
| IMG_20260114_100039.jpg | 11aFcO3qES--1Z58c6_Ngbp6LPTzJAmiR |
| IMG_20260114_100055.jpg | 1Swrib2IguVaGncCf0eB6CXTuIW54pHlI |
| IMG_20260114_100118.jpg | 1P87eksgVWrxh-Xe_OztzknSwF8pjaxVA |
| IMG_20260114_100139.jpg | 1ys_qqh8jyc1rxjVGXBreTjCj5csdgP1D |
| IMG_20260114_100150.jpg | 1-WSEsT5B3WGE5fRsuIG_VOGZnKKzuxze |
| IMG_20260114_100304.jpg | 1_q4bnVPSnJNCVEjM4YwiGW_6w2y6-GqX |
| IMG_20260114_100330.jpg | 1x9I6K_VaqdtbmG9ndXc6uZzcCtdK677V |
| IMG_20260114_101521.jpg | 1x390XDGPQUMJIIO6cB3lxgdxGKFIvREg |
| IMG_20260114_101535.jpg | 1mzYNiGtWG2989NV9ZreOTc0vEX-qzJVY |
| IMG_20260114_083658.jpg | 1Nge_GXqqEFhxWk48KkYe1oY3p-li_QgP |
| IMG_20260114_083714.jpg | 1TRuXTIizeLkB7_1YjYmGOJ9J2RKokANi |
| IMG_20260114_083730.jpg | 1IPoFHIcbBMKUdjWecOMNkiSxFgsCZ4hb |
| IMG_20260114_083829.jpg | 1o_uHqVUNvxl3x2td9EeLbiRBiZR1-6W4 |
| IMG_20260114_083839.jpg | 10EN6kD07LzBXKSwFv_TxGhMyK4IMsuUL |
| IMG_20260114_083845.jpg | 1GLu987SR_lDZgtviXSxu2EeGksAtPpN- |
| IMG_20260114_083906.jpg | 15J_X93oPfv7bnWZlPZbWm9C4u50JVIfS |
| IMG_20260114_083937.jpg | 1NqqqNuUjzzt1lPGQYiaw55aQDVewMD5D |
| IMG_20260114_083949.jpg | 1u--ONjbXQ-nEBzKr56Pu4Whn7HW42U50 |
| IMG_20260114_083952.jpg | 1YsEZ1s8WAMiwlFG4c_ACeDzrOD-9qyjY |
| IMG_20260114_083958.jpg | 1YTNrcVfkJBb_4evJ6eS4FSdoj6lF4UEt |
| IMG_20260114_084007.jpg | 1TNh-kTy_1cOlzB9yjVNQGgKWoRhjC4nU |
| IMG_20260114_084052.jpg | 1EzrftTBHSngDPR_l_YUAD5z-zdA2Qoz_ |
| IMG_20260114_084145.jpg | 1d-Fobl9H_d9P5dA8Hdz_nDB-GG_IbhSq |
| IMG_20260114_084205.jpg | 1SyOckaBIQYinthb_qIY284Ll3WxM8kNY |
| IMG_20260114_084216.jpg | 1ZdxOEa38rtTICvjX5HI6Q1if3h7yzW-w |
| IMG_20260114_084335.jpg | 1j1bywIGSCi0kKQO7wsxbuOMUBYiKeU-a |
| IMG_20260114_084732.jpg | 1RL0js5ieFzzx9UUmFySzwf0c6cWc_ewb |
| IMG_20260114_084751.jpg | 1N4gQpXzxwSkz0iJ_v6ZS-EusbmRMSxD4 |
| IMG_20260114_084804.jpg | 1R1d0pTHt0CsF3d10Lp5pW0KaBFEmNdHz |
| IMG_20260114_084858.jpg | 1TfhF6wg09xvjBEiFNy9QahG2MJc8_Y5G |
| IMG_20260114_084902.jpg | 1sDsmPRDotTJYOLJ4pnJ-2OwTioYuRDxP |
| IMG_20260114_085501.jpg | 1PE9VWUtoUmEyoyOAaCEFYLlZl_VgAeRP |
| IMG_20260114_085518.jpg | 1ImRzJK0krlLXKihwwEHlkQgmdwkejL05 |
| IMG_20260114_085532.jpg | 1Et1pU0MiZ19cwKW_WqHDY40W0PJN61Ce |
| IMG_20260114_085552.jpg | 18886cXnvrKIgbh2YEqUwNlkEOT7ZWJgo |
| IMG_20260114_085919.jpg | 1jpLk2S4qrZdrZ7WXbs0o1edSMjuq0u2G |
| IMG_20260114_085929.jpg | 1YNuwfHSIokC_vW_qYwsXq9p8jeW4s_4M |
| IMG_20260114_091509.jpg | 1099iH_c914aEMuOHXDn0HwHSwRPE7UIf |
| IMG_20260114_091528.jpg | 1FbM2aK1FYJBl7jzqcYl24GpSEZ0A1-47 |
| IMG_20260114_091534.jpg | 1OxPNb9G_AfAYF0OAQ5uVt21reNvAo3de |
| IMG_20260114_091635.jpg | 1UBbwPB7esx9JvelpITn8-oRsEzuoEi77 |
| FIMI0004.JPG | 19QVPXMV6TfNvLTlS2eYE0izAnpkNuIcd |
| FIMI0054.JPG | 1VM3MZc4B0Z6crH6yCIlRSoTFoq_O1y-U |
| WhatsApp Image 2025-04-03 at 13.30.20.jpeg | 1n_eV1Rm7YUUoc1-KnfV1ReNxq0fZfJlZ |
| WhatsApp Image 2025-04-03 at 13.30.19 (1).jpeg | 1N_FQUc_NENiMSK0hIty4IbPS3B26QTfu |
| WhatsApp Image 2025-04-03 at 13.30.11.jpeg | 1ylzUV5ORBXbI7YmEceic8Wwkqxr9AZxu |
