# 🚀 HelpFlow: Sistema de HelpDesk Completo

## 📸 Preview

### 📝 Criação de Ticket
![Criar Ticket](public/create-ticket.PNG)
Formulário intuitivo para abertura de chamados com título e descrição detalhada.

---

### 📄 Detalhes do Ticket
![Detalhes](public/detail-ticket.PNG)
Visualização completa do ticket com status, informações e ações disponíveis para agentes.

---

### 📊 Dashboard
![Dashboard](public/screenshot.PNG)
Painel principal com listagem dinâmica dos tickets e seus respectivos status.

## 🌟 Visão Geral

O **HelpFlow** é uma aplicação web Full-Stack de sistema de HelpDesk (gerenciamento de chamados), projetada para facilitar a comunicação entre clientes e equipes de suporte.

A aplicação permite abertura, acompanhamento e gerenciamento de tickets de forma eficiente, com autenticação segura e controle de acesso baseado em papéis.

👉 Este projeto demonstra habilidades práticas em:

* Desenvolvimento Full-Stack
* Autenticação e autorização
* Integração com banco de dados
* Arquitetura moderna com Next.js

🔗 **Acesse a aplicação em produção:**
https://helpflow.vercel.app/

---

## 🎯 Principais Funcionalidades

### 🔐 Autenticação

* Login com **Email e Senha** (criptografia com bcrypt)
* Login social com **GitHub OAuth**
* Integração com banco via Prisma Adapter

### 👥 Controle de Acesso (RBAC)

* **CLIENT**

  * Cria tickets
  * Visualiza apenas seus próprios chamados
* **AGENT**

  * Visualiza todos os tickets
  * Atualiza status
  * Remove tickets

### 📝 Gestão de Tickets

* Criação de chamados com título e descrição
* Atualização de status:

  * Aberto
  * Em Progresso
  * Fechado
* Exclusão de tickets (AGENT)

### 📊 Dashboard

* Listagem dinâmica de tickets
* Visualização clara do status

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** Next.js 15 (App Router)
* **Linguagem:** JavaScript
* **Estilização:** Tailwind CSS
* **Autenticação:** NextAuth.js
* **ORM:** Prisma
* **Banco de Dados:** PostgreSQL (Supabase)
* **Segurança:** bcryptjs

---

## ⚙️ Configuração do Ambiente

### 1. Clone o repositório

```bash
git clone https://github.com/tharcio09/helpflow.git
cd helpflow
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Preencha com suas credenciais:

```env
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

DATABASE_URL=
DIRECT_URL=
```

---

### 4. Configure o banco de dados

```bash
npx prisma migrate dev
npx prisma generate
```

---

### 5. Inicie o projeto

```bash
npm run dev
```

---

## 🔐 Configuração do GitHub OAuth

Configure no GitHub:

**Callback URL (local):**

```
http://localhost:3000/api/auth/callback/github
```

**Callback URL (produção):**

```
https://helpflow.vercel.app/api/auth/callback/github
```

---

## 📌 Notas Técnicas

> Este projeto utiliza as APIs dinâmicas do Next.js 15, com suporte assíncrono para parâmetros de rota (`await params`), seguindo as práticas mais recentes do framework.

---

## 🚀 Deploy

O projeto está hospedado na **Vercel**, com integração contínua via GitHub.

---

## 📫 Contato

**Tharcio Santos**

* 💼 LinkedIn: https://www.linkedin.com/in/tharcio-santos/
* 📧 Email: [tharciosantos09@gmail.com](mailto:tharciosantos09@gmail.com)