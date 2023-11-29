# Projeto-fullstack-tech_carlaffp


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

- Rotas que necessitam autenticação (É necessário enviar o **Bearer token** no Header dessa requisição):

  - **GET/users**
  - **GET e PATCH e DELETE/users/:id**

- Rotas que necessitam de permissão (somente o prórpio usuário tem permissão para listar ele mesmo ou atualizar ou deletar seus dados, de acordo com o id passado no parâmetro da requisição):

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
      "message": // mensagem padrão da biblioteca
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

  ````json
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

- **Exemplos de retornos**:

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

- **Exemplos de retornos**:

- Listando usuários com sucesso:

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
    },
  ```
#

### **PATCH /users/:id**

- Deve atualizar um usuário pelo id recebido nos parâmetros da rota.
- Não é necessário enviar todos os dados para atualização.
- É necessário enviar o **Bearer token** no Header dessa requisição.
- Apenas usuários logados e com permissão podem acessar essa rota.

- **Exemplos de retornos**:

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

  ````json
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
  |                       |



  

