# 🛒 Store Manager

Uma API RESTful desenvolvida com Node.js, Express e MySQL para gerenciar vendas e produtos de uma loja. A aplicação permite criar, listar, editar e excluir produtos e vendas, com foco em boas práticas de desenvolvimento e arquitetura em camadas.

## ✨ Demonstração

> Projeto sem interface visual. A API expõe endpoints que podem ser testados via Postman, Insomnia ou ferramentas similares.

## 📋 Índice

- [Sobre](#-sobre)
- [Habilidades desenvolvidas](#-habilidades-desenvolvidas)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Como rodar o projeto](#-como-rodar-o-projeto)
- [Autor](#-autor)

## 💡 Sobre

Neste projeto foi criada uma API para gerenciar uma loja de vendas. A aplicação é composta por:

- CRUD completo para produtos e vendas
- Validações de dados com mensagens customizadas
- Camadas separadas de Controller, Service e Model
- Integração com banco de dados MySQL

A arquitetura visa a escalabilidade e organização de projetos de back-end.

## 🛠️ Habilidades desenvolvidas

- Modelagem de dados com MySQL
- Criação de APIs REST com Express
- Aplicação de arquitetura MSC (Model-Service-Controller)
- Validação de dados com middleware
- Escrita de testes automatizados com Mocha, Chai e Sinon
- Uso de `async/await` e boas práticas de código assíncrono

## 🧪 Tecnologias utilizadas

- Node.js
- Express
- MySQL
- JavaScript ES6+
- Mocha, Chai, Sinon
- Docker & Docker Compose

## 🚀 Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/tryber/store-manager.git
```

2. Acesse a pasta do projeto

```bash
cd store-manager
```

3. Instale as dependências

```bash
npm install
```

4. Configure o arquivo .env com as variáveis de ambiente do banco de dados (se necessário).

5. Inicie o servidor local:

```bash
npm start
```
>A aplicação abrirá no navegador em http://localhost:3000

## 👤 Autor

Este projeto foi desenvolvido como parte do curso de Desenvolvimento Web da Trybe, por Jyoji Tenguam.
