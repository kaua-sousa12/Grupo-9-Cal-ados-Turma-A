# Projeto E-commerce com JSON Server

# Sobre o projeto

Este projeto foi desenvolvido como parte de uma atividade acadêmica com o objetivo de simular um sistema de **e-commerce**, utilizando uma API fake criada com **JSON Server**.

A aplicação permite realizar operações básicas como:

* Listagem de produtos
* Cadastro de novos produtos
* Edição de informações
* Exclusão de itens

---

# Objetivo

O principal objetivo deste projeto é praticar conceitos de:

* Consumo de API REST
* CRUD (Create, Read, Update, Delete)
* Organização de código
* Integração entre front-end e back-end (simulado)

---

# Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript / TypeScript
* Angular
* JSON Server

---

# Como executar o projeto

# 1. Clonar o repositório

```bash
git clone https://github.com/kaua-sousa12/Grupo-9-Cal-ados-Turma-A.git
```

---

## 2. Instalar dependências (se usar Angular)

```bash
npm install
```

---

## 3. Iniciar o JSON Server

```bash
npx json-server --watch db.json --port 3000
```

A API estará disponível em:

```
http://localhost:3000
```

---

## 4. Rodar o projeto

```bash
ng serve
```

A aplicação estará disponível em:

```
http://localhost:4200
```

---

## Endpoints principais

* GET /products → listar produtos
* GET /products/:id → buscar produto
* POST /products → criar produto
* PUT /products/:id → atualizar produto
* DELETE /products/:id → remover produto

---

# Autores

Eduardo Santos
Gabriel Souza
Gabriel Vinicius
Kauan
---

# Observações

Este projeto tem fins educacionais e utiliza um backend simulado com JSON Server.
