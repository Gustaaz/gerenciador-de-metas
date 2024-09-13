# Gerenciador de metas - In.Orbit

Um sistema de gerenciamento de metas pessoais que permite aos usuários definir quantas vezes pretendem realizar uma atividade por semana e acompanhar o cumprimento dessas metas ao longo do tempo. O sistema salva um histórico detalhado, permitindo que o usuário visualize seu progresso e desempenho, ajudando a manter a consistência e a motivação na busca por seus objetivos.

## 🔥 Introdução

### Objetivos
O principal objetivo deste projeto é fornecer uma ferramenta simples, mas eficaz, para auxiliar o usuário na organização e no acompanhamento de suas metas pessoais. Com isso, ele será capaz de manter um hábito constante e rastrear seu desempenho semanal.

### Funcionalidades
* Definição de metas semanais: O usuário pode definir quantas vezes deseja realizar uma atividade ao longo da semana.
* Acompanhamento do progresso: O sistema permite que o usuário registre cada vez que realiza a atividade, atualizando o progresso semanal automaticamente.
* Histórico de desempenho: Todas as atividades realizadas são armazenadas em um histórico, permitindo que o usuário acompanhe seu desempenho ao longo do tempo.
* Interface intuitiva: Facilita a visualização e edição das metas semanais e a consulta rápida ao histórico de atividades.

### ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente:

* [Docker](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js](https://nodejs.org/en)
* [Git](https://git-scm.com/downloads) (para clonar o repositório)


### 🔨 Guia de instalação

#### Passo 1: Clone o Repositório

Clone o repositório do projeto em sua máquina local usando o Git:
```
git clone https://github.com/Gustaaz/gerenciador-de-metas.git
```

#### Passo 2: Acesse a Raiz do Projeto

Vá para a raiz do projeto onde está o arquivo docker-compose.yaml:
```
cd gerenciador-de-metas
```

#### Passo 3: Suba o Ambiente com Docker Compose

O docker-compose.yaml na raiz do projeto já configura o banco de dados. Para iniciar os serviços, basta rodar o seguinte comando:
```
docker-compose up
```

### Executando o Backend e o Frontend Localmente

#### Passo 4: Instalação do Backend (Node.js + Fastify)
   
* Acesse a pasta do backend:
```
cd backend
```
* Instale as dependências do projeto:
```
npm install
```
* Inicie o servidor backend:
```
npm run dev
```
O backend estará disponível em http://localhost:3333.

#### Passo 5: Instalação do Frontend (React + Vite)
* Acesse a pasta do backend:
```
cd frontend
```
* Instale as dependências do projeto:
```
npm install
```
* Inicie o servidor frontend:
```
npm run dev
```

## 📦 Tecnologias usadas:

**Front-end:**
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
* ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
* ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)


**Back-end:**
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
* ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
* ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)


## 📄 Licença

Esse projeto está sob a licença (MIT) - acesse os detalhes [LICENSE.md](https://github.com/Gustaaz/gerenciador-de-metas/blob/main/LICENSE).
