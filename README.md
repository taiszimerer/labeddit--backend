 ## Labeddit Backend
Este é o backend do projeto Labeddit, uma rede social onde os usuários podem fazer login, cadastro, criar, curtir e comentar posts.

### Tecnologias utilizadas
- Node.js
- Express
- Typescript
- SQLite
- Token JWT

## Como rodar a aplicação
1. Faça um clone deste repositorio em sua máquina: 
```bash
git clone https://github.com/taiszimerer/labeddit--backend.git
```
2. Na raiz do projeto, instale as dependências:
```bash
npm i 
```
3. Execute a aplicação:
```bash
npm start
```

#### Endpoints
#### Signup
Permite que um usuário crie uma conta na plataforma.
URL: /signup
Método: POST
```bash
Body:
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

Resposta esperada:
```bash
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```


#### Login
Permite que um usuário faça login na plataforma.
URL: /login
Método: POST
Body:
```bash
{
  "email": "string",
  "password": "string"
}
```
Resposta esperada:
```bash
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```

#### Criar um post
Permite que um usuário autenticado crie um novo post.
URL: /posts
Método: POST
Body:
```bash
{
  "content": "string"
}
```
Resposta esperada:
```bash
{
  "post": {
    "id": "string",
    "content": "string",
    "creatorId": "string",
    "createdAt": "string",
    "likes": 0,
    "comments": 0
  }
}
```
#### Listar todos os posts
Permite que um usuário autenticado liste todos os posts.
URL: /posts
Método: GET
Resposta esperada:
```bash
 {    
 "id": "string",   
 "content": "string",   
 "creatorId": "string",   
 "createdAt": "string",   
 "likes": 0,   
 "comments": 0  
 }
```
#### Curtir um post
Permite que um usuário autenticado curta um post.
URL: /posts/:id/like
Método: PUT
Resposta esperada:
```bash

{
  "likes": 1
}
```

#### Descurtir um post
Permite que um usuário autenticado descurta um post.
URL: /posts/:id/dislike
Método: PUT
Resposta esperada:
```bash
{
  "likes": 0
}
```

#### Comentar em um post
Permite que um usuário autenticado comente em um post.

URL: /posts/:id/comments
Método: POST
