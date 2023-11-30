# Projeto-fullstack-ConnectSphere

# Introdução

Trata-se de uma solução para gerenciar usuários e seus contatos.

## Configurando o ambiente e startando o back-end -API (pasta back)

- Para conseguir rodar a aplicação back-end é necessário ter o **PostgreSQL** instalado e configurado em sua máquina, pode acessar a documentação oficial no site postgresql.org.
- Acesse o PostgreSQL pelo terminal e crie um DATABASE.
- Ao clonar o repositório, instale as dependências com o comando **npm install**.
- Crie na pasta back, na raiz do projeto um arquivo **.env** que deve ser preenchido com seus dados postgre com base no arquivo **.env.example**.
- Execute as migrações com o comando:                     **npm run typeorm migration:run -- -d ./src/data-source**
- inicie a aplicação com o comando: **npm run dev**

## Configurando o ambiente e startando o front-end (pasta front)
- Para conseguir rodar a aplicação front-end é necessário ter o **Node.js** instalado e configurado em sua máquina, para isso você pode acessar o site **nodejs.org** .
- - Ao clonar o repositório, instale as dependências com o comando **npm install**.
- inicie a aplicação com o comando: **npm run dev**


## **Rotas - /users e /login**

## Endpoints

| Método | Endpoint           | Responsabilidade                              |
| ------ | ------------------ | --------------------------------------------- |
| POST   | /users             | Cadastrar um novo usuário                     |
| POST   | /login             | Criar o token de autenticação para um usuário |
| GET    | /users             | Listar todos os usuários                      |
| GET    | /users/:id/        | Listar os usuários por id          |
| PATCH  | /users/:id/        | Atualizar o usuário por id         |
| DELETE | /users/:id/        | Deletar um usuário por id         |

#

## Regras da Aplicação

- Rotas que necessitam **autenticação** (É necessário enviar o **Bearer token** no Header dessa requisição):

  - **GET/users**
  - **GET e PATCH e DELETE/users/:id**

- Rotas que necessitam de **permissão** (somente o próprio usuário tem permissão para listar ele mesmo ou atualizar ou deletar seus dados, de acordo com o id passado no parâmetro da requisição):

  - **GET e PATCH e DELETE/users/:id**

## Exemplos de Requisição

### **Casos de Erro**:

- O email deve ser único nas rotas **POST e PATCH/users**.
  - Tentando cadastrar com um email existente:

  | Resposta do servidor:       |
  | --------------------------- |
  | Body: Formato Json          |
  | Status code: _409 CONFLICT_ |

  ```json
  {
    "message": "Email already exists"
  }
  ```
- A serialização dos dados de entrada acontecem nas rotas **POST e PATCH/users** , em caso de erro ao validar os dados:
  
  | Resposta do servidor:          |
  | ------------------------------ |
  | Body: Formato Json             |
  | Status code: _400 BAD REQUEST_ |

  ```json
  {
    "fullName": ["Required"],
    "email": ["Invalid email"],
    "password": ["Expected string, received number"],
    "phone": ["Required"],
    
  }
  ```
- A serialização dos dados de entrada também acontece na rota **POST/login** , em caso de erro ao validar os dados:
  
  | Resposta do servidor:          |
  | ------------------------------ |
  | Body: Formato Json             |
  | Status code: _400 BAD REQUEST_ |

  ```json
  {
    "email": ["Invalid email"],
    "password": ["Expected string, received number"],
    
  }
  ```
- Tentando fazer login na rota **POST/login**, com email não existente ou senha incorreta:

  | Resposta do servidor:           |
  | ------------------------------- |
  | Body: Formato Json              |
  | Status code: _401 UNAUTHORIZED_ |

  ```json
  {
    "message": "Invalid credentials"
  }
  ```
- Em todas as rotas que recebem **id** por parâmetro, será verificado a existência do **id** informado. Caso não exista:
  
  | Resposta do servidor:          |
  | ------------------------------ |
  | Body: Formato Json             |
  | Status code: _404 NOT FOUND_   |

  ```json
  {
    "message": "User not found"
  }
  ```
- Nas rotas que necessitam enviar o **token** no Header da requisição:
   - Caso o token não seja enviado:

  | Resposta do servidor:           |
  | ------------------------------- |
  | Body: Formato Json              |
  | Status code: _401 UNAUTHORIZED_ |

  ```json
  {
    "message": "Missing bearer token"
  }
  ```

- Caso o token enviado seja inválido:

  | Resposta do servidor:           |
  | ------------------------------- |
  | Body: Formato Json              |
  | Status code: _401 UNAUTHORIZED_ |

  ```json
  {
      "message": "invalid token"
  }
  ```
- Nas rotas que necessitam de permissão:
  - Caso o token pertença a um usuário que não tenha permissão para acesso ao id informado no parâmetro da requisição:

  | Resposta do servidor:        |
  | ---------------------------- |
  | Body: Formato Json           |
  | Status code: _403 FORBIDDEN_ |

  ```json
  {
    "message": "Insufficient permission"
  }
  ```

#

### **Casos de Sucesso**:

### **POST /users**

- Deve ser possível criar um usuário enviando o seguinte através do corpo da requisição;
  - **fullName**: string, campo obrigatório.
  - **email**: string, campo obrigatório.
  - **password**: string, campo obrigatório
  - **phone**: string, campo obrigatório.

- Criando um usuário com sucesso:

  | Dados de entrada:  |
  | ------------------ |
  | Body: Formato Json |

  ```json
  {
      "fullName": "Ugo Machado",
      "email": "ugo@mail.com.br",
      "password": "1234",
      "phone": "34733940"
  }
  ```

  | Resposta do servidor:      |
  | -------------------------- |
  | Body: Formato Json         |
  | Status code: _201 CREATED_ |

  ```json
  {
      "id": 1,
      "fullName": "Ugo Machado",
      "email": "ugo@mail.com.br",
      "phone": "34733940",
      "createdAt": "2023-11-21"
  }
  ```
#

### **POST /login**

- Deve ser possível criar um token jwt enviando o seguinte através do corpo da requisição:

  - **email**: string, campo obrigatório.
  - **password**: string, campo obrigatório

- Tentando fazer login com email e senha corretos:

  | Dados de entrada:  |
  | ------------------ |
  | Body: Formato Json |

  ```json
  {
    "email": "ugo@mail.com.br",
    "password": "1234"
  }
  ```

  | Resposta do servidor: |
  | --------------------- |
  | Body: Formato Json    |
  | Status code: _200 OK_ |
  |                       |

  ```json
  {
    "user": {
		  "id": 1,
		  "fullName": "Ugo Machado",
		  "email": "ugo@mail.com.br",
		  "password": "$2a$10$rZCC1M1fFI.Nm9VYs.6ZoeEmic0cCy1wZqjW8MFkd1Lh71ZHS6SdS",
		  "phone": "34733940",
		  "createdAt": "2023-11-21"
	  },
	 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#

### **GET /users**

- Deve listar todos os usuários.
- É necessário enviar o **Bearer token** no Header dessa requisição.
- Apenas usuários logados tem permissão de acessar essa rota.

- Listando usuários com sucesso:

  | Resposta do servidor: |
  | --------------------- |
  | Body: Formato Json    |
  | Status code: _200 OK_ |
  |                       |

  ```json
  [
    {
      "id": 1,
      "FullName": "Ugo Machado",
      "email": "ugo@mail.com.br",
      "phone": "34733940",
		  "createdAt": "2023-11-21"
    },
    {
      "id": 2,
      "fullName": "Lucas Costa",
      "email": "lucas@mail.com.br",
      "phone": "36962584",
		  "createdAt": "2023-11-20"
    }
  ]
  ```
#

### **GET /users/:id**

- Deve listar o usuário cujo id foi recebido nos parâmetros da rota.
- É necessário enviar o **Bearer token** no Header dessa requisição.
- Apenas usuários logados e com permissão podem acessar essa rota.

- Listando usuário com sucesso:

  | Resposta do servidor: |
  | --------------------- |
  | Body: Formato Json    |
  | Status code: _200 OK_ |
  |                       |

  ```json
  
    {
      "id": 1,
		"fullName": "Ugo Machado",
		"email": "ugo@mail.com.br",
		"password": "$2a$10$rZCC1M1fFI.Nm9VYs.6ZoeEmic0cCy1wZqjW8MFkd1Lh71ZHS6SdS",
		"phone": "34733940",
		"createdAt": "2023-11-21"
    }
  ```
#

### **PATCH /users/:id**

- Deve atualizar um usuário pelo id recebido nos parâmetros da rota.
- Não é necessário enviar todos os dados para atualização.
- É permitido atualizar qualquer dado (inclusive a senha),´so não é possivel o createdAT (dado gerado automaticamente na criação do usuário).
- É necessário enviar o **Bearer token** no Header dessa requisição.
- Apenas usuários logados e com permissão podem acessar essa rota.

  | Dados de entrada:  |
  | ------------------ |
  | Body: Formato Json |

  ```json
  {
    "fullName": "Ugo Machado Costa",
    "phone": "34733950"
  }
  ```

  | Resposta do servidor: |
  | --------------------- |
  | Body: Formato Json    |
  | Status code: _200 OK_ |
  |                       |

  ```json
  {
		"id": 1,
		"fullName": "Ugo Machado Costa",
		"email": "ugo@mail.com.br",
		"phone": "34733950",
		"createdAt": "2023-11-21"
  }
  ```
#

### **DELETE /users/:id**

- Deve deletar um usuário pelo id recebido nos parâmetros da rota.
- É necessário enviar o **Bearer token** no Header dessa requisição.
- Apenas usuários logados e com permissão podem acessar essa rota.


  | Resposta do servidor:                  |
  | -------------------------------------- |
  | Body: Nenhum body deve ser retornado   |
  | Status code: _204 NO CONTENT_          |
  |                                        |

#

## **Rota - /contacts**

## Endpoints

| Método | Endpoint                         | Responsabilidade                                  |
| ------ | -------------------------------- | ------------------------------------------------- |
| POST   | /contacts                        | Cadastrar um novo contato                           |
| GET    | /contacts                        | Listar todos os contatos de um usuário                            |
| GET    | /contacts/:id                    | Lista um contato especifico de um usuário                 |
| PATCH  | /contacts/:id                    | Atualizar um contato |
| DELETE | /contacts/:id                    | Deletar um contato |

#

## Regras da Aplicação

- **Todas** as rotas /contacts necessitam **autenticação** (É necessário enviar o **Bearer token** no Header dessa requisição):

  - **POST /contacts**
  - **GET /contacts**
  - **GET /contacts/:id**
  - **PETCH /contacts/:id**
  - **DELTE /contacts/:id**

## Exemplos de Requisição

### **Casos de Erro**:

- O email deve ser único nas rotas **POST e PATCH/contacts**.
Na lista de contatos do usuário logado não pode haver contatos com o mesmo email.
  - Tentando cadastrar com um email existente:

  | Resposta do servidor:       |
  | --------------------------- |
  | Body: Formato Json          |
  | Status code: _409 CONFLICT_ |

  ```json
  {
    "message": "There is already a contact registered with this email."
  }
  ```
- A serialização dos dados de entrada acontecem nas rotas **POST e PATCH/contacts** , em caso de erro ao validar os dados:
  
  | Resposta do servidor:          |
  | ------------------------------ |
  | Body: Formato Json             |
  | Status code: _400 BAD REQUEST_ |

  ```json
  {
    "fullName": ["Required"],
    "email": ["Invalid email"],
    "phone": ["Required"],
  }
  ```
- Em todas as rotas que recebem **id** por parâmetro, será verificado na tabela de contatos a existência do **id** informado. Caso não exista:
  
  | Resposta do servidor:          |
  | ------------------------------ |
  | Body: Formato Json             |
  | Status code: _404 NOT FOUND_   |

  ```json
  {
    "message": "Contact not found"
  }
  ```
  - Também srá verificado na lista de conatos do usuário logado se ele tem em seus contatos aquele id recebido por parâmetro. Caso não exista:

  
  | Resposta do servidor:          |
  | ------------------------------ |
  | Body: Formato Json             |
  | Status code: _404 NOT FOUND_   |

  ```json
  {
    "message": "Not found contact id 9 for this user."
  }
  ```
- Para todas as rotas é necessário enviar o **token** no Header da requisição:
   - Caso o token não seja enviado:

  | Resposta do servidor:           |
  | ------------------------------- |
  | Body: Formato Json              |
  | Status code: _401 UNAUTHORIZED_ |

  ```json
  {
    "message": "Missing bearer token"
  }
  ```

- Caso o token enviado seja inválido:

  | Resposta do servidor:           |
  | ------------------------------- |
  | Body: Formato Json              |
  | Status code: _401 UNAUTHORIZED_ |

  ```json
  {
      "message": "invalid token"
  }
  ```
#

### **Casos de Sucesso**:

### **POST /contacts**

- Deve ser possível criar um contato que será associado ao usuário logado, enviando o seguinte através do corpo da requisição;
  - **fullName**: string, campo obrigatório.
  - **email**: string, campo obrigatório.
  - **phone**: string, campo obrigatório.

- É necessário enviar o **Bearer token** no Header dessa requisição. 
- Apenas usuários logados tem permissão de acessar essa rota.

- Criando um contato com sucesso:

  | Dados de entrada:  |
  | ------------------ |
  | Body: Formato Json |

  ```json
  {
      "fullName": "Luna Borges",
      "email": "luna@mail.com.br",
      "phone": "34343434"
  }
  ```

  | Resposta do servidor:      |
  | -------------------------- |
  | Body: Formato Json         |
  | Status code: _201 CREATED_ |

  ```json
  {
      
	"id": 1,
	"fullName": "Luna Borges",
	"email": "luna@mail.com",
	"phone": "34343434",
	"createdAt": "2023-11-22",
	"user": {
		"id": 1,
		"fullName": "Ugo Machado ",
		"email": "ugo@mail.com.br",
		"phone": "34733940",
		"createdAt": "2023-11-21"
	}
  }
  ```

#

### **GET /contacts**

- Deve listar todos os contatos do usuário logado.
- É necessário enviar o **Bearer token** no Header dessa requisição.
- Apenas usuários logados tem permissão de acessar essa rota.

- Listando usuários com sucesso:

  | Resposta do servidor: |
  | --------------------- |
  | Body: Formato Json    |
  | Status code: _200 OK_ |
  |                       |

  ```json
  {
	"id": 1,
	"fullName": "Ugo Machado ",
	"email": "ugo@mail.com.br",
	"password": "$2a$10$pR6vr/S7CtwFXMYNUNXmP.qoMcSqu6xizj0p9.u5ZZq3D03frMjq6",
	"phone": "34733940",
	"createdAt": "2023-11-21",
	"contacts": [
		{
			"id": 8,
			"fullName": "Bia Castro ",
			"email": "bia@mail.com",
			"phone": "34733955",
			"createdAt": "2023-11-23"
		},
		{
			"id": 1,
			"fullName": "Lana Borges",
			"email": "lana@mail.com",
			"phone": "34343434",
			"createdAt": "2023-11-22"
		}
	  ]
  }
  ```
#

### **GET /contacts/:id**

- Deve listar o contato cujo id foi recebido nos parâmetros da rota, caso o usuário logado tenha em sua lista de contatos um contato com o id informado este será listado.
- É necessário enviar o **Bearer token** no Header dessa requisição.
- Apenas usuários logados podem acessar essa rota.

- Listando Contato com sucesso:

  | Resposta do servidor: |
  | --------------------- |
  | Body: Formato Json    |
  | Status code: _200 OK_ |
  |                       |

  ```json
  
  {
    
	"id": 1,
	"fullName": "Luna Borges",
	"email": "luna@mail.com",
	"phone": "34343434",
	"createdAt": "2023-11-22",
	"user": {
		"id": 1,
		"fullName": "Ugo Machado ",
		"email": "ugo@mail.com.br",
		"phone": "34733940",
		"createdAt": "2023-11-21"
	 }
  }
  ```
#
### **PATCH /contacts/:id**

- Deve atualizar um contato pelo id recebido nos parâmetros da rota.
- Não é necessário enviar todos os dados para atualização.
- Apenas usuários logados podem acessar essa rota.
- É necessário enviar o **Bearer token** no Header dessa requisição.
- É verificado na tabela de contatos se o id recebido nos parâmetros existe e se na lista de contatos do usuário logado existe algum contato com o id recebido nos parâmetros da rota.

  | Dados de entrada:  |
  | ------------------ |
  | Body: Formato Json |

  ```json
  {
    "fullName": "Luna Borges Campelo",
    "email": "lanacampelo@mail.com"
  }
  ```

  | Resposta do servidor: |
  | --------------------- |
  | Body: Formato Json    |
  | Status code: _200 OK_ |
  |                       |

  ```json
  {
		"id": 1,
		"fullName": "Luna Borges Campelo",
		"email": "lunacampleo@mail.com",
		"phone": "34343434",
		"createdAt": "2023-11-22"
  }
  ```
#

### **DELETE /contacts/:id**

- Deve deletar um contato pelo id recebido nos parâmetros da rota.
- É necessário enviar o **Bearer token** no Header dessa requisição.
- Apenas usuários logados podem acessar essa rota.
- È verificado na tabela de contatos se o id recebido nos parâmetros existe e se na lista de contatos do usuário logado existe algum contato com o id recebido nos parâmetros da rota.


  | Resposta do servidor:                  |
  | -------------------------------------- |
  | Body: Nenhum body deve ser retornado   |
  | Status code: _204 NO CONTENT_          |
  |                                        |

  






  

