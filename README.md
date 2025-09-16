# 📚 API-Biblioteca

Uma API REST para gerenciamento de biblioteca (livros, usuários, empréstimos etc.).

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## 🧾 Sumário
- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Testes](#testes)
- [Docker](#docker)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 📖 Sobre

A **API-Biblioteca** é um serviço REST completo desenvolvido para gerenciar acervo de livros, usuários, empréstimos e devoluções. A API permite cadastrar novos livros, realizar empréstimos, acompanhar status de devoluções e muito mais.

**Principais objetivos:**
- Automatizar o gerenciamento de bibliotecas
- Facilitar o controle de empréstimos e devoluções
- Fornecer uma interface moderna para sistemas de biblioteca
- Oferecer uma base sólida para desenvolvimento de frontends

**Público-alvo:** Bibliotecas escolares, universitárias, públicas e desenvolvedores que precisam de uma API robusta para gerenciamento de acervo.

## ⚡ Funcionalidades

- ✅ **CRUD de Livros** - Cadastrar, consultar, atualizar e remover livros
- ✅ **CRUD de Usuários** - Gerenciar bibliotecários e leitores
- ✅ **Sistema de Empréstimos** - Listar empréstimos ativos, devolver e renovar
- ✅ **Autenticação / Autorização** - Sistema seguro de login e permissões
- ✅ **Validação de Dados** - Validação rigorosa de entrada de dados
- ✅ **Documentação dos Endpoints** - API bem documentada para fácil integração

## 🛠 Tecnologias

As principais ferramentas e tecnologias utilizadas neste projeto:

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript para backend
- **[Express](https://expressjs.com/)** - Framework web minimalista e flexível
- **[Prisma](https://www.prisma.io/)** - ORM moderno para TypeScript e Node.js
- **Banco de dados** - PostgreSQL, MySQL ou SQLite (configurável)
- **[Docker](https://www.docker.com/) + docker-compose** - Containerização e orquestração
- **[Jest](https://jestjs.io/)** - Framework de testes JavaScript

## 🚀 Instalação

Siga os passos abaixo para executar o projeto localmente:

```bash
# Clonar o repositório
git clone https://github.com/wendel211/API-Biblioteca.git
cd API-Biblioteca

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com dados do banco e outras chaves necessárias

# Executar migrações ou setup do banco
npx prisma migrate dev

# Iniciar o servidor
npm run start
```

### Configuração do .env

Certifique-se de configurar as seguintes variáveis no arquivo `.env`:

```env
# Configurações do banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/biblioteca"

# JWT (se houver autenticação)
JWT_SECRET="seu_jwt_secret_aqui"

# Porta do servidor
PORT=3000
```

## 📋 Uso

Após iniciar o servidor, você pode acessar os endpoints da API:

**Base URL:** `http://localhost:3000/api`

### Endpoints Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/livros` | Listar todos os livros |
| `GET` | `/livros/:id` | Buscar livro por ID |
| `POST` | `/livros` | Criar novo livro |
| `PUT` | `/livros/:id` | Atualizar livro |
| `DELETE` | `/livros/:id` | Remover livro |

### Exemplo de Requisição

**Cadastrar um novo livro:**
```bash
curl -X POST http://localhost:3000/api/livros \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "titulo": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien",
    "isbn": "978-0544003415",
    "categoria": "Fantasia"
  }'
```

### Autenticação

Se o projeto incluir autenticação, você precisará:

1. **Fazer login** no endpoint `/auth/login`
2. **Obter o token** JWT da resposta
3. **Incluir o token** no header `Authorization: Bearer {token}` nas requisições protegidas

## 🧪 Testes

Para executar os testes do projeto:

```bash
# Executar todos os testes
npm run test

# Executar testes com cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

Os testes incluem:
- **Testes unitários** para funções e serviços
- **Testes de integração** para endpoints da API
- **Testes de validação** para entrada de dados
- **Mocks** para dependências externas

## 🐳 Docker

O projeto inclui suporte completo ao Docker para facilitar o deployment:

```bash
# Construir imagem
docker-compose build

# Subir containers (aplicação + banco de dados)
docker-compose up

# Executar em background
docker-compose up -d

# Parar containers
docker-compose down
```

### Desenvolvimento com Docker

Para desenvolvimento, o docker-compose inclui:
- **Hot reload** para mudanças no código
- **Volume binding** para desenvolvimento local
- **Banco de dados** automaticamente configurado

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── controllers/          # Controladores das rotas
│   ├── routes/              # Definição das rotas da API
│   ├── models/              # Modelos de dados (Prisma)
│   ├── services/            # Lógica de negócio
│   └── index.js             # Ponto de entrada da aplicação
├── prisma/
│   ├── schema.prisma        # Schema do banco de dados
│   └── migrations/          # Migrações do banco
├── tests/                   # Testes automatizados
├── .env.example            # Exemplo de variáveis de ambiente
├── docker-compose.yml      # Configuração Docker Compose
├── Dockerfile              # Configuração da imagem Docker
├── package.json            # Dependências e scripts
└── README.md              # Documentação do projeto
```

### Principais Diretórios

- **`src/controllers/`** - Contém a lógica dos controladores que processam as requisições
- **`src/routes/`** - Define todas as rotas da API e conecta com os controladores
- **`src/services/`** - Implementa a lógica de negócio da aplicação
- **`prisma/`** - Configurações do banco de dados e migrações
- **`tests/`** - Todos os arquivos de teste da aplicação

## 🤝 Contribuição

Contribuições são muito bem-vindas! Este projeto está aberto para issues e pull requests.

### Como Contribuir

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Diretrizes

- **Padrões de código:** Siga os padrões estabelecidos (ESLint, Prettier)
- **Testes:** Adicione testes para novas funcionalidades
- **Documentação:** Mantenha a documentação atualizada
- **Commits:** Use mensagens de commit claras e descritivas

### Antes de Contribuir

- Verifique se não existe uma issue similar
- Execute os testes localmente antes de enviar
- Certifique-se de que o código passa na revisão de código

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

A Licença MIT é uma licença permissiva que permite uso comercial, modificação, distribuição e uso privado, desde que a nota de direitos autorais seja preservada.

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!**

Desenvolvido com ❤️ por [Wendel](https://github.com/wendel211)

</div>
