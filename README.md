# SauceDemo Playwright Tests

Suíte de testes automatizados end-to-end para o [SauceDemo](https://www.saucedemo.com/), 
construída com Playwright e organizada em Page Object Model. Inclui também uma camada 
de testes de API com Postman, executada via Newman em pipeline de integração contínua.

## Stack

- **Playwright** (JavaScript) — testes end-to-end de interface
- **Postman + Newman** — testes de API, rodando via linha de comando
- **GitHub Actions** — execução automática da suíte a cada push

## Estrutura do projeto

\```
saucedemo-playwright-tests/
├── tests/              # Testes end-to-end (Playwright)
├── pages/              # Page Object Model — elementos e ações por tela
├── postman/            # Coleção Postman exportada + ambiente
├── .github/workflows/  # Pipeline de CI (GitHub Actions)
└── README.md
\```

## Cenários cobertos

- Login (sucesso e falha)
- Adicionar produtos ao carrinho
- Fluxo completo de checkout
- Validação de endpoints via coleção Postman/Newman

## Como rodar localmente

**Testes end-to-end (Playwright):**
\```bash
npm install
npx playwright test
\```

**Testes de API (Postman via Newman):**
\```bash
npm install -g newman
newman run postman/saucedemo-collection.json
\```

## Integração contínua

Os testes rodam automaticamente a cada push via GitHub Actions. 
Veja o status em `.github/workflows/`.

## Autor

Pedro Paulo Queiroz — [LinkedIn](https://www.linkedin.com/in/pedro-paulo-queiroz/)
