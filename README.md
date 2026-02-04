# 🚀 HelpFlow: Sistema de HelpDesk Completo

![Screenshot da Página de Detalhes de um Ticket no HelpFlow](public/screenshot.PNG) 

## 🌟 Visão Geral

O HelpFlow é uma aplicação web Full-Stack robusta de sistema de HelpDesk (chamados), projetada para simplificar a comunicação e o gerenciamento de solicitações entre clientes e equipes de suporte (agentes). Desenvolvido com tecnologias modernas, o HelpFlow oferece uma solução eficiente e segura para o acompanhamento de problemas e tarefas.

Este projeto demonstra habilidades sólidas em desenvolvimento Full-Stack, gerenciamento de banco de dados, autenticação e autorização baseada em papéis.

**[➡️ Acesse a versão ao vivo aqui!](https://helpflow.vercel.app/)** ---

## ✨ Funcionalidades Principais

* **Autenticação Dual:** Login de usuários via **email/senha** ou **GitHub OAuth**, oferecendo flexibilidade e segurança.
  * **Email/Senha:** Sistema completo de registro e autenticação com criptografia bcrypt.
  * **GitHub OAuth:** Autenticação rápida e segura integrada ao banco de dados via **Prisma Adapter**.
* **Gerenciamento de Usuários:** Distinção entre dois tipos de usuários:
  * **Clientes:** Podem criar novos tickets e visualizar apenas os seus próprios tickets.
  * **Agentes:** Possuem acesso a todos os tickets, podendo visualizar detalhes, atualizar o status (Aberto, Em Progresso, Fechado) e deletar tickets.
* **Criação de Tickets:** Clientes podem abrir novos chamados de forma intuitiva, fornecendo título e descrição detalhada do problema.
* **Dashboard Interativo:** Visão geral dos tickets, com listagem dinâmica e exibição do status atual.
* **API RESTful:** Backend eficiente para todas as operações CRUD (Create, Read, Update, Delete) de tickets.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** [Next.js](https://nextjs.org/) (App Router v15)
* **Linguagem:** JavaScript
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Autenticação:** [NextAuth.js](https://next-auth.js.org/) com Prisma Adapter.
* **Segurança:** [bcryptjs](https://www.npmjs.com/package/bcryptjs) para hash de senhas.
* **ORM:** [Prisma](https://www.prisma.io/)
* **Banco de Dados:** [Supabase](https://supabase.com/) (PostgreSQL)

[![My Skills](https://skillicons.dev/icons?i=nextjs,react,tailwind,prisma,supabase)](https://skillicons.dev)

> [!IMPORTANT]
> ### 💡 Notas de Implementação (Next.js 15)
> Este projeto utiliza as **Dynamic APIs** assíncronas do Next.js 15. Seguindo as novas convenções do framework, o acesso a parâmetros de rotas dinâmicas (como `params.id`) foi implementado de forma assíncrona utilizando `await params` em todas as rotas de API (`GET`, `PUT`, `PATCH`, `DELETE`), garantindo alta performance e compatibilidade com as versões mais recentes.

---

## 👥 Papéis de Usuário (Roles)

O sistema implementa uma lógica de autorização baseada em dois papéis:

* **`CLIENT` (Cliente):** Papel padrão para novos usuários. Pode criar e visualizar apenas seus próprios tickets.
* **`AGENT` (Agente):** Acesso total. Pode visualizar todos os tickets, atualizar status e excluir registros. Atribuição manual via banco de dados.

---

## 🚀 Como Rodar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/tharcio09/helpflow.git](https://github.com/tharcio09/helpflow.git)
    cd helpflow
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Prepare o Banco de Dados:**
    Após configurar seu `.env`, execute as migrações para criar as tabelas necessárias (incluindo as tabelas de suporte ao NextAuth):
    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

4.  **Consulte o guia detalhado:**
    Veja o arquivo [`DEVELOPMENT.md`](./DEVELOPMENT.md) para detalhes sobre variáveis de ambiente e configuração do GitHub OAuth.

---

## 📫 Contato

**Tharcio Santos**

* [LinkedIn](https://www.linkedin.com/in/tharcio-santos/)
* [Email](mailto:tharciosantos09@gmail.com)