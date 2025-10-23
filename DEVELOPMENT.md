# Guia de Desenvolvimento Local - HelpFlow

Este guia descreve como configurar o ambiente para rodar o projeto HelpFlow localmente, utilizando Next.js, Prisma, Supabase e NextAuth.js.

## 1. Pré-requisitos

* Node.js (versão recomendada: 18 ou superior)
* npm ou yarn
* Git instalado e configurado
* Conta no [GitHub](https://github.com/)
* Conta no [Supabase](https://supabase.com/)

## 2. Configuração Inicial

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/tharcio09/helpflow.git](https://github.com/tharcio09/helpflow.git) # Substitua pela URL correta do seu repo
    cd helpflow
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

## 3. Configuração do Banco de Dados (Supabase + Prisma)

1.  **Crie um projeto no Supabase:**
    * Crie um novo projeto no painel do Supabase.
    * Anote a **senha do banco de dados** que você definir.

2.  **Obtenha a URL de Conexão (Transaction Pooler):**
    * No painel do seu projeto Supabase, vá para `Project Settings` (⚙️) > `Database`.
    * Role para baixo até a seção `Connection Pooler`.
    * Selecione o método `Transaction pooler`.
    * Copie a **URL de conexão** fornecida (ela usará a porta `6543`).

3.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Cole o conteúdo abaixo, substituindo os placeholders pelos seus valores:

    ```env
    # .env

    # Conexão com o banco de dados Supabase (Use a URL do Transaction Pooler!)
    DATABASE_URL="postgresql://postgres:[SUA_SENHA_SUPABASE]@[...pooler.supabase.com:6543/postgres](https://...pooler.supabase.com:6543/postgres)"

    # Chaves de Autenticação do GitHub (Obtidas em Settings > Developer settings > OAuth Apps no GitHub)
    AUTH_GITHUB_ID="SEU_CLIENT_ID_DO_GITHUB"
    AUTH_GITHUB_SECRET="SEU_CLIENT_SECRET_DO_GITHUB"

    # Chave Secreta para o NextAuth (Gerada com 'openssl rand -base64 32' no terminal)
    AUTH_SECRET="SUA_CHAVE_SECRETA_LONGA_E_ALEATORIA"

    # URL base para o NextAuth em ambiente local
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Sincronize o Schema do Prisma com o Banco de Dados:**
    Este comando criará as tabelas no seu banco de dados Supabase com base no arquivo `prisma/schema.prisma`.
    ```bash
    npx prisma db push
    ```

## 4. Configuração da Autenticação (GitHub OAuth)

1.  **Crie uma OAuth App no GitHub:**
    * Vá para `GitHub` > `Settings` > `Developer settings` > `OAuth Apps` > `New OAuth App`.
    * **Application name:** `HelpFlow` (ou similar)
    * **Homepage URL:** `http://localhost:3000`
    * **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
    * Registre a aplicação.
    * Gere um **Client Secret**.
    * Copie o **Client ID** e o **Client Secret** e coloque-os no seu arquivo `.env`.

## 5. Rodando o Projeto

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

2.  Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 6. Comandos Úteis do Prisma

* **Sincronizar schema após mudanças:**
  ```bash
  npx prisma db push
````

  * **Gerar/Atualizar o Prisma Client:** (Útil se o VS Code não estiver reconhecendo tipos do Prisma)
    ```bash
    npx prisma generate
    ```
  * **Abrir o Prisma Studio:** (Uma interface gráfica para ver e editar seu banco de dados localmente)
    ```bash
    npx prisma studio
    ```

## 7. Solução de Problemas Comuns

  * **Erro `prepared statement ... exists` ou `does not exist` no terminal:**
    Este é um problema conhecido da interação entre Prisma, Supabase Pooler e o hot-reloading do Next.js no ambiente de desenvolvimento.
    **Solução:** Pare o servidor de desenvolvimento (`Ctrl+C`) e reinicie-o (`npm run dev`).
  * **Erro `Can't reach database server`:**
    Verifique se a `DATABASE_URL` no `.env` está correta (usando a URL do **Transaction Pooler**, porta `6543`), se a senha está correta e se o projeto Supabase não está pausado.

-----

```
```