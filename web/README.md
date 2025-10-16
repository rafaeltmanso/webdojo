# Testes Automatizados - WebDojo (Cypress)

Este projeto contém testes automatizados para a aplicação **WebDojo**, utilizando o framework **Cypress**.

---

## 📂 Estrutura do Projeto

Abaixo está a estrutura principal do diretório `cypress` conforme o projeto:

```
cypress/
├── e2e/
├── fixtures/
│   ├── cep.json
│   ├── consultancy.json
│   └── document.pdf
└── support/
    ├── actions/
    │   └── consultancy.actions.js
    ├── commands.js
    ├── e2e.js
    └── utils.js
```

### 🧩 Descrição das Pastas

- **e2e/** → Contém os testes automatizados da aplicação WebDojo.
- **fixtures/** → Armazena arquivos de dados estáticos usados nos testes (como JSONs e PDFs).
- **support/** → Contém scripts de suporte, comandos personalizados e funções auxiliares.
  - **actions/** → Agrupa ações reutilizáveis como fluxos de login, cadastro, etc.
  - **commands.js** → Registra comandos customizados do Cypress.
  - **utils.js** → Funções utilitárias auxiliares.
  - **e2e.js** → Configurações globais para execução dos testes.

---

## ⚙️ Configuração e Execução

### 1️⃣ Instalar Dependências

Execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install
```

### 2️⃣ Executar a Aplicação WebDojo

A aplicação **WebDojo** está no mesmo repositório.  
Para iniciar o servidor local da aplicação, use:

```bash
npm run dev
```

Isso irá servir a aplicação em **http://localhost:3000**.

### 3️⃣ Executar os Testes

Existem diferentes scripts configurados para execução dos testes Cypress.

#### ▶️ Executar todos os testes

```bash
npm run test
```

> Executa todos os testes automatizados com resolução de 1920x1080.

#### 🧭 Abrir interface interativa do Cypress

```bash
npm run test:ui
```

> Abre o painel do Cypress para executar testes manualmente.

#### 🔐 Testar fluxo de login (modo desktop)

```bash
npm run test:login
```

> Executa apenas o teste de login na resolução **1920x1080**.

#### 📱 Testar fluxo de login (modo mobile)

```bash
npm run test:login:mobile
```

> Executa o teste de login simulando um dispositivo móvel (**414x896**).

---

## 🧪 Boas Práticas

- Manter nomes claros e descritivos para arquivos de teste.
- Utilizar **fixtures** para armazenar dados de entrada previsíveis.
- Centralizar comandos e funções reutilizáveis em `support/`.
- Evitar duplicação de código em testes e ações.
- Sempre validar o comportamento esperado com assertivas claras.

---

## 🧰 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) – Framework de testes end-to-end.
- [Node.js](https://nodejs.org/) – Ambiente de execução JavaScript.
- [npm](https://www.npmjs.com/) – Gerenciador de pacotes.
- [serve](https://www.npmjs.com/package/serve) – Servidor para build local da aplicação.

---
