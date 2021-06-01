# RS-Personal Server

Servidor e dashboard de gerenciamento para o site [RS-Personal](https://github.com/PSouza-10/RS-personal).

## Stack
Linguagem: Typescript
- Servidor
  - PostgreSQL
  - TypeORM
  - Express
- Dashboard
  - React.JS
  - styled-components
  - Redux com redux-toolkit

## Features

O servidor contem a lógica das requisições do site e da dashboard, utilizando a mesma base de dados através do Heroku Postgres.

- Editor de postagens de blog
- Tabelas de visualização das respostas de formulário do site do usuário

# Rodar Localmente

Para configurar a base de dados, leia a documentação do [TypeORM](https://typeorm.io/#/). Para rodar migrations utilize "yarn typeorm <comando>"
Para acessar a dashboard, você deve criar um novo usuário no banco de dados e entrar com suas crendenciais.

```bash
git clone https://github.com/PSouza-10/rs-personal-server
cd rs-personal-server

yarn

# Instalar dependências do servidor
cd server
yarn

# voltar para a raiz
cd ..

# Instalar dependências da dashboard
cd client
yarn

# voltar para a raiz
cd ..

# rodar servidor

yarn server

# rodar dashboard

yarn client
```
