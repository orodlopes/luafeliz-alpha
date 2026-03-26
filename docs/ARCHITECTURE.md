# Arquitetura do Projeto: Lua Feliz

## Visão Geral
O projeto **luafeliz.com.br** utiliza uma arquitetura Jamstack focada em performance, segurança e SEO. O site atua como um catálogo estático de curadoria de produtos.

## Fonte de Verdade (Source of Truth)
A fonte de verdade para todos os produtos exibidos no site é um arquivo estático localizado em `/data/catalogo.json`. 

Este arquivo é gerado e atualizado externamente através de automações (ex: via Make.com), que consolidam as informações dos produtos, preços e links de afiliados.

## Segurança e Integrações
Por motivos de segurança e performance, o frontend **NUNCA** realiza chamadas diretas para APIs de programas de afiliados (como Amazon, Shopee, AliExpress, etc). 
Toda a comunicação com essas APIs ocorre no backend/automação (Make.com), que apenas atualiza o arquivo `catalogo.json` final. Isso garante que:
1. Chaves de API e credenciais nunca sejam expostas no lado do cliente.
2. O tempo de carregamento da página seja extremamente rápido, pois os dados já estão consolidados.
3. O site seja resiliente a quedas nas APIs de terceiros.
