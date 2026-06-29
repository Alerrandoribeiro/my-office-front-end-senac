# My Office Front End

My Office é a interface de usuário para um sistema de reservas de salas. O objetivo é tornar fácil para empresas e profissionais encontrarem, cadastrarem e reservarem espaços de reunião.

## O que este projeto faz

- Mostra todas as salas disponíveis para reserva
- Permite cadastrar uma nova sala com dados como preço, capacidade, endereço e imagem
- Preenche o endereço automaticamente ao digitar o CEP
- Permite que o usuário faça login e gerencie suas próprias salas
- Permite que o usuário veja e edite suas reservas
- Exibe uma página institucional com informações sobre a equipe e valores

## Como usar

1. Instale as dependências:

```bash
npm install
```

2. Rode o aplicativo em modo de desenvolvimento:

```bash
npm run dev
```

3. Abra o navegador no endereço mostrado no terminal (geralmente `http://localhost:5173`).

## O que é necessário

- Node.js instalado
- Um backend rodando em `http://localhost:8080`

O frontend se comunica com uma API local para buscar e enviar informações de salas, usuários e reservas.

## Páginas principais

- **Início**: apresenta o app e permite navegar para outras áreas
- **Todas as salas**: lista as salas disponíveis
- **Cadastro de sala**: formulário para publicar um novo espaço
- **Cadastro de usuário**: formulário para criar conta
- **Login**: entrar na conta existente
- **Minhas salas**: ver as salas cadastradas pelo usuário
- **Reservas**: ver, editar e excluir reservas feitas pelo usuário
- **Quem somos**: mostra informações da empresa e seus valores

## Estrutura do projeto

- `src/main.jsx`: inicializa o React e ativa as notificações na tela
- `src/App.jsx`: define as rotas da aplicação
- `src/components/`: contém os componentes visuais e páginas
- `src/service/`: faz a comunicação com o backend
- `src/utils/`: guarda funções de apoio, como máscaras e validações

## Tecnologias usadas

### Frontend

- React 19
- Vite
- React Router Dom
- React Toastify
- ESLint

### Backend

- Java
- Spring Boot
- API REST local em `http://localhost:8080`

## Funcionalidades do aplicativo

- **Buscar salas**: exibe todas as salas disponíveis para reserva em uma lista com fotos, valores e endereço.
- **Cadastrar sala**: permite criar um espaço novo, com CEP, endereço, preço, capacidade, descrição e foto.
- **Editar sala**: o usuário logado pode atualizar dados de suas próprias salas.
- **Excluir sala**: salas com reservas não podem ser removidas, garantindo segurança para quem já reservou.
- **Cadastro de usuário**: cria uma conta com nome, telefone, email e senha.
- **Login**: permite entrar na conta e acessar áreas privadas do app.
- **Minhas salas**: mostra apenas as salas cadastradas pelo usuário logado.
- **Reservas**: permite ver, editar ou excluir reservas feitas pelo usuário.
- **Busca de CEP**: ao digitar o CEP, o app busca endereço automaticamente usando BrasilAPI.
- **Notificações**: mensagens de sucesso e erro orientam o usuário em cada ação.

## Como o app funciona na prática

- O usuário navega pelas páginas usando o menu no topo
- O cadastro de sala exige CEP, endereço, preço, capacidade e imagem
- O campo de CEP busca o endereço usando a API do BrasilAPI
- O login salva os dados do usuário localmente para usar em páginas privadas
- O app exibe mensagens de sucesso ou erro para guiar o usuário

## Observações

- O foco do app é a experiência do usuário, com formulários claros e um fluxo direto
- A interface é organizada em componentes para facilitar a manutenção
- O projeto está pronto para ser conectado a uma API local em `http://localhost:8080`
