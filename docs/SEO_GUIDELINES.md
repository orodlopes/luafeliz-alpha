# Diretrizes de SEO e Tracking: Lua Feliz

## Estratégia de Dados Estruturados (JSON-LD)
Para garantir a máxima visibilidade nos motores de busca (Google) e ser facilmente interpretável por LLMs e IAs de busca (Search Generative Experience), o site utiliza marcação Schema.org via JSON-LD.

### Product e Offer Schema
Cada produto listado no catálogo deve ter sua respectiva marcação `Product` e `Offer`. Isso é crucial para:
- **Feature Snippets e Rich Results:** Exibir preço, disponibilidade e avaliações diretamente nos resultados de busca.
- **Google Shopping:** Facilitar a listagem orgânica na aba Shopping.
- **LLMs:** Fornecer contexto estruturado e semântico sobre o que o produto é, quanto custa e como comprá-lo.

## Estrutura do JSON-LD
A marcação deve ser injetada no `<head>` ou no final do `<body>` contendo propriedades como:
- `name`, `description`, `image`
- `offers` (com `price`, `priceCurrency`, `availability`)
- `aggregateRating` (para exibir as estrelinhas nos resultados)

## Tracking e Analytics
O esqueleto do HTML já prevê espaços demarcados para a inserção de scripts de tracking essenciais:
- **Google Search Console:** Para monitoramento de indexação e performance orgânica.
- **Google Analytics 4 (GA4):** Para análise de tráfego e comportamento do usuário.
- **Meta Pixel:** Para rastreamento de conversões e criação de públicos personalizados.
- **Google Ads Remarketing:** Para campanhas de redirecionamento.
