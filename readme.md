📚 JSNSD — Node.js Services Developer Labs

Coleção de laboratórios para estudo da certificação JSNSD (Linux Foundation)
Node.js • Express • REST APIs • Proxy • Segurança

Este repositório reúne três mini-projetos desenvolvidos durante meus estudos para a certificação JSNSD – Node.js Services Developer.

Eles cobrem fundamentos práticos exigidos na prova:

Estruturação de serviços Node.js

Criação de REST APIs

Manipulação de JSON e storage leve

Segurança de endpoints

Rate limiting e mitigação de DDoS

Proxy reverso e agregação de APIs

Modularização com Express Router

Middlewares customizados

O objetivo é servir como portfólio, referência técnica e material de estudo.

🧩 Conteúdo do Repositório

O repositório contém 3 laboratórios independentes, cada um dentro de seu próprio diretório:

1️⃣ RESTful With JSON Services

📁 restfull_with_jsonservices/
📌 REST API simples utilizando arquivo JSON como datastore.

Conceitos abordados:

CRUD básico em Express

Arquitetura Server → Router → Model

Leitura e escrita em arquivo JSON

Fluxo REST completo: listar, criar, buscar e remover

🔗 Abrir projeto →

2️⃣ Mitigating Attacks — DDoS & IP Filtering

📁 mitigating_attacks_DDoS/
📌 API consumindo serviço externo com mitigação de ataques e segurança básica.

Conceitos abordados:

Rate limiting (express-rate-limit)

Filtro de IP (express-ipfilter)

trust proxy

Consumo de API externa com axios

Proteção contra abuso de endpoints

🔗 Abrir projeto →

3️⃣ API Aggregator — HTTP Proxy Middleware

📁 aggregate_api_http_proxy_middleware/
📌 API Gateway simples usando http-proxy-middleware.

Conceitos abordados:

Proxy reverso para Rick & Morty API

Autorização por header

pathRewrite e manipulação de caminhos

Agregação de dados a partir de API externa

Middlewares encadeados

🔗 Abrir projeto →
```text
🏗 Estrutura do Repositório
JSNSD/
│
├── LICENSE
├── restfull_with_jsonservices/
│   ├── Server.js
│   ├── routers/
│   └── models/
│
├── mitigating_attacks_DDoS/
│   ├── server.js
│   └── src/
│
└── aggregate_api_http_proxy_middleware/
    ├── server.js
    └── src/
```
📦 Tecnologias Utilizadas

Node.js

Express.js

Axios

HTTP Proxy Middleware

express-rate-limit

express-ipfilter

dotenv

fs (para persistência em arquivos)

🎯 Objetivo Educacional

Embora eu não tenha realizado a prova do JSNSD na época, estes laboratórios consolidam diversos pilares exigidos pelo exame e demonstram:

domínio de Express e middleware chaining

entendimento do ecossistema HTTP

exposição de serviços REST

boas práticas de modularização

manipulação de JSON

implementação de proxies e filtros

Eles são uma excelente base para qualquer pessoa que deseja criar serviços Node.js confiáveis, seguros e bem estruturados.

📄 Licença

Todo o conteúdo deste repositório está sob a MIT License:

MIT License — Copyright (c) 2024
By VMarconatto

📬 Contato

Se quiser trocar ideias, colaborar ou revisar esses laboratórios:

📧 vinicius.marconatto

