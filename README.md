<div>
  <img src="https://res.cloudinary.com/diogofoodexplorer/image/upload/v1723388693/banner-readme_a5bzbd.jpg" alt="Banner Food Explorer">
  
  <h1>🍔 API - Food Explorer</h1>

  <p >A <b>API do Food Explorer</b> fornece uma interface robusta para gerenciar e explorar uma vasta seleção de pratos.</p>

  <a href="https://github.com/diogo-kappaun/food-explorer-api" target="_blank"><img alt="React" src="https://img.shields.io/badge/Food%20Explorer-ff7f0f?style=for-the-badge&logo=nodedotjs&logoColor=white"></a>
  
</div>

## 📖 Tabela de Conteudos
  <ul>
    <li><a href="#-descrição">🚀 Descrição</a></li>
    <li><a href="#-pré-requisitos">📃 Pré-requisitos</a></li>
    <li><a href="#-tecnologias-utilizadas">💻 Tecnologias utilizadas</a></li>
    <li><a href="#%EF%B8%8F-instalação">🛠️ Instalação</a></li>
    <li><a href="#%EF%B8%8F-uso">🗺️ Uso</a></li>
    <li><a href="#%EF%B8%8F-estrutura-de-pastas">🏗️ Estrutura de Pastas</a></li>
    <li><a href="#-autor">👨🏻‍💻 Autor</a></li>
    <li><a href="#-licença">📄 Licença</a></li>
  </ul>

## 🚀 Descrição
  <h3>Visão geral</h3>
  <p>A <b>API do Food Explorer</b> é uma solução robusta para gerenciamento e exploração de dados gastronômicos. Destinada a facilitar a integração entre sistemas e permitir uma interação fluida entre frontend e banco de dados, a API é projetada para fornecer uma ampla gama de funcionalidades para desenvolvedores e administradores de aplicações.</p>
  <h3>Principais Funcionalidades:</h3>
  <p><b>1️⃣ Gerenciamento de Dados:</b> Suporte completo para operações CRUD, tanto para pratos quanto para usuários, permitindo a manipulação eficiente de dados.</p>
  <p><b>2️⃣ Exploração de Dados:</b> Endpoints que permitem buscar, classificar e favoritar pratos com base em diferentes critérios, proporcionando uma experiência de usuário personalizada.</p>
  <p><b>3️⃣ Autenticação Segura:</b> Implementação de autenticação e autorização para proteger dados sensíveis e garantir que apenas usuários autorizados possam acessar ou modificar informações.</p>
  <p><b>4️⃣ Carregamento de imagens em nuvem:</b> Suporte para carregamento de imagens na nuvem utilizando Cloudinary, proporcionando uma solução eficiente com infraestrutura robusta.</p>

  
## 📃 Pré-requisitos
<p>Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:</p>
<a href="https://nodejs.org/en/download"><img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Nodejs"></a>
<p><b>Versão: v18.0.0+</b></p>
<a href=""><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm"></a>
<p><b>Versão: v8.0.0+</b></p>

## 💻 Tecnologias utilizadas
<div>
  <p><a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"><img src="https://img.shields.io/badge/javascript-F7DF1E&color=white?style=for-the-badge&logo=javascript&logoColor=white"></a></p>
  <p><a href="https://nodejs.org/"><img src="https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white"></a></p>
  <p><a href="https://expressjs.com/"><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"></a></p>
  <p><a href="https://cloudinary.com/"><img src="https://img.shields.io/badge/cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white"></a></p>
  <p><a href="https://knexjs.org/"><img src="https://img.shields.io/badge/knex.js-D26B38?style=for-the-badge&logo=knexdotjs&logoColor=white"></a></p>
  <p><a href="https://www.sqlite.org/"><img src="https://img.shields.io/badge/sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white"></a></p>
  <p><a href="https://github.com/dcodeIO/bcrypt.js"><img src="https://img.shields.io/badge/bcryptjs-000000?style=for-the-badge"></a></p>
</div>

## 🛠️ Instalação
### 1️⃣ Clone o repositório:
Primeiro, clone o repositório do projeto para o seu ambiente local utilizando o Git:

```bash
git clone https://github.com/diogo-kappaun/food-explorer-api
```
### 2️⃣ Vá até o repositório clonado:
Após clonar o repositório, navegue até o diretório do projeto:
```bash
cd food-explorer-api
```
### 3️⃣ Instale as dependências:
Instale todas as dependências necessárias para executar o projeto. Isso inclui o knexjs, express e outras bibliotecas mencionadas no package.json:
```bash
npm install
```
### 4️⃣ Configurar Variáveis de Ambiente:
Vá até o arquivo .env.example na raiz do projeto, renomeie para .env e altere o valor conforme necessário. (Caso a porta não seja definida, o padrão será porta 10000 para o localhost)
```bash
PORT=""                       # Se não declarado, porta 3333.
AUTH_TOKEN=""                 # Se não declarado, valor default.
CLOUDINARY_CLOUD_NAME=""      # É necessário ter uma conta no Cloudinary.
CLOUDINARY_API_KEY=""         # É necessário ter uma conta no Cloudinary.
CLOUDINARY_API_SECRET=""      # É necessário ter uma conta no Cloudinary.
```
### 5️⃣ Execute as migrations:
Abra o terminal e inicie as migrations:
```bash
npm run migrate
```

### 5️⃣ Execute a servidor:
Abra o terminal e inicie o servidor da seguinte forma:
```bash
npm run dev
```

## 🗺️ Uso

Esta seção explica como utilizar a API do Food Explorer para gerenciar e explorar pratos e bebidas.

### Pré-requisitos

- Certifique-se de ter o Node.js instalado.
- Instale o Insomnia ou outra ferramenta para testar APIs.
- Obtenha uma chave de API para autenticação.

### Autenticação

A API do Food Explorer utiliza autenticação via token. Para acessar a API, você precisará incluir um token válido no cabeçalho de suas requisições:

```bash
Auth -> Bearer Token -> Token -> token-do-login
```

### Endpoints Principais:

### ♦️ Criação de usuário:
- Método: POST
- URL: "/api/users"
- Descrição: Cria um novo usuário no sistema.
- Parâmetros (JSON):
```json
{
  "name": "seu nome",
  "email": "seu email",
  "password": "sua senha"
}
```

### ♦️ Criação de Sessões (login):
- Método: POST
- URL: "/api/sessions"
- Descrição: Criar uma sessão de login para o usuário.
- Parâmetros (JSON):
```json
{
  "email": "seu email",
  "password": "sua senha"
}
```

### ♦️ Criação de Pratos:
- Método: POST
- URL: "/api/dishes"
- Descrição: Criar um novo prato no sistema.
- Requisitos: Usuário ADMIN.
- Parâmetros (JSON):
```json
{
  "name": "nome do prato",
  "description": "descrição do prato",
  "price": preço do prato (formatação XX.XX),
  "category": "categoria do prato",
  "ingredients": ["ingredientes do prato"]
}
```

### ♦️ Edição de Pratos:
- Método: PUT
- URL: "/api/dishes?id=(id do prato)"
- Descrição: Alterar informações do prato informado.
- Requisitos: Usuário ADMIN.
- Parâmetros (JSON):
```json
{
  "name": "novo nome do prato",
  "description": "nova descrição do prato",
  "price": novo preço do prato (formatação XX.XX),
  "category": "nova categoria do prato",
  "ingredients": ["novos ingredientes do prato"]
}
```

### ♦️ Listar todos os pratos:
- Método: GET
- URL: "/api/dishes"
- Descrição: Listar todos os pratos do sistema.
- Resposta esperada (JSON):
```json
{
  "id": 1,
  "name": "Combo Clássico",
  "description": "Hambúrguer com queijo, alface, tomate e molho especial, acompanhado de batata frita e refrigerante.",
  "category": "combos",
  "price": 39.9,
  "image_id": "hc2unnllmrqocpbcucdo",
  "ingredients": ["Hambúrguer", "Queijo", "Alface", "Tomate", "Molho especial", "Batata frita", "Refrigerante"
  ]
}
```

### ♦️ Alterar imagem do prato:
- Método: PATCH
- URL: "/api/dishes/image?id=(id do prato)"
- Descrição: Alterar imagem do prato.
- Requisitos: Usuário ADMIN.
- Parâmetros (Multipart):
```bash
    | image (nome do campo) | && | file (imagem) |
```

### ♦️ Deletar prato:
- Método: DELETE
- URL: "/api/dishes?id=(id do prato)"
- Descrição: Deletar um prato do sistema.
- Requisitos: Usuário ADMIN.


## 🏗️ Estrutura de Pastas
Abaixo está a estrutura principal do projeto:
```bash
food-explorer-api
├── node_modules               # Contém todos os pacotes e dependências instalados via npm.
├── src
│   ├── config                 # Arquivos de configuração da aplicação
│   ├── controllers            # Controladores de respostas para as requisições HTTP.
│   ├── database               # Configuração e gerenciamento do banco de dados.
│   ├── middlewares            # Middlewares que interceptam as requisições.
│   ├── providers              # Controle do armazenamento local de imagens
│   ├── repositories           # Responsável por interagir com o banco de dados e realizar operações CRUD.
│   ├── routes                 # Definição das rotas da API.
│   ├── services               # Serviços que contêm a lógica de negócios da aplicação.
│   ├── utils                  # Funções utilitárias e auxiliares.
│   └── server.js              # Arquivo principal que inicializa o servidor.
├── knexfile.js                # Arquivo de configuração do Knex.
└── tmp                        # Diretório temporário usado para armazenar arquivos temporários.
```

## 👨🏻‍💻 Autor

<a href="https://github.com/diogo-kappaun">
 <img src="https://github.com/diogo-kappaun.png" width="100px;" />
 <br />
 <sub><b>Diogo H. Kappaun</b></sub>
</a>


Feito com ❤️ por Diogo H. Kappaun 👋🏽 Entre em contato!

[![Instagram Badge](https://img.shields.io/badge/@eu.diogokappaun-E4405F?style=for-the-badge&logo=instagram&logoColor=white&link=https://www.instagram.com/eu.diogokappaun/)](https://www.instagram.com/eu.diogokappaun/) [![Linkedin Badge](https://img.shields.io/badge/Diogo_Kappaun-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/diogo-kappaun-2070b2265/)](https://www.linkedin.com/in/diogo-kappaun-2070b2265/) 
[![Gmail Badge](https://img.shields.io/badge/Me_envie_um_email-c14438?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:diogohkappaun@gmail.com)](mailto:diogohkappaun@gmail.com)

## 📄 Licença

Este projeto é licenciado sob os termos da Licença MIT. A Licença MIT é uma licença de código aberto que permite o uso, modificação, distribuição e venda do software, sujeito a certas condições. Consulte o arquivo <b><a href="https://github.com/diogo-kappaun/food-explorer-api/blob/main/LICENSE">LICENSE</a></b> para mais detalhes.
