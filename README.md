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

**HelpFlow** é um sistema de helpdesk full-stack construído com Next.js 15, Prisma e PostgreSQL. O projeto implementa autenticação com múltiplos provedores (credentials + GitHub OAuth) e controle de acesso baseado em papéis (RBAC), com autorização aplicada no servidor em todas as rotas protegidas.

O objetivo foi construir uma aplicação funcional e segura, tomando decisões técnicas reais: escolha de estratégia JWT para sessões, propagação de `role` como claim no token, e separação entre o que o frontend exibe e o que o backend efetivamente permite.

🔗 **Aplicação em produção:** https://helpflow.vercel.app/

---

## 🎯 Principais Funcionalidades

### 🔐 Autenticação

* Login com **Email e Senha** (criptografia com bcrypt)
* Login social com **GitHub OAuth**
* Integração com banco via Prisma Adapter

### 👥 Controle de Acesso (RBAC)

O sistema implementa RBAC (Role-Based Access Control) com dois papéis distintos. No login, o `role` é incluído como claim no token JWT e propagado para a sessão via NextAuth, tornando-o disponível em todas as rotas. A autorização é aplicada no servidor com base em `role` e `ownership` do ticket — o frontend reflete essas permissões, mas o enforcement real é sempre server-side.

* **CLIENT** *(papel padrão)*

  * Cria tickets
  * Visualiza apenas seus próprios chamados
  * Edita e remove apenas os tickets que abriu

* **AGENT**

  * Visualiza todos os tickets do sistema
  * Atualiza o status de qualquer ticket
  * Edita e remove qualquer ticket, independentemente do autor

> A autorização é aplicada nas rotas da API com base em `role` e `ownership`. O frontend reflete as permissões do backend — mas a validação real ocorre no servidor, não na interface.

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

> **Next.js 15:** O projeto utiliza o App Router com suporte assíncrono para parâmetros de rota (`await params`), seguindo as práticas mais recentes do framework.

> **Autorização:** O RBAC é aplicado diretamente nas Route Handlers da API. Cada endpoint verifica `role` e `ownership` de forma independente, sem depender da interface para restringir acesso. Usuários com role `AGENT` têm esses privilégios concedidos exclusivamente via claim JWT — não por parâmetro enviado pelo cliente.

---

## 🚀 Deploy

O projeto está hospedado na **Vercel**, com integração contínua via GitHub.

---

## 📫 Contato

**Tharcio Santos**

* 💼 LinkedIn: https://www.linkedin.com/in/tharcio-santos/
* 📧 Email: [tharciosantos09@gmail.com](mailto:tharciosantos09@gmail.com)