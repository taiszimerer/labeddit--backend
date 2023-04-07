 ## Labeddit Backend
Este é o backend do projeto Labeddit, uma rede social onde os usuários podem fazer login, cadastro, criar, curtir e comentar posts.

### Tecnologias utilizadas
- Node.js
- Express
- Typescript
- SQLite


## Requisitos do projeto
Para utilizar a API, é necessário que o usuário esteja autenticado. Para isso, é necessário enviar um token JWT válido no cabeçalho "Authorization" de cada requisição. O token é obtido ao fazer login na rota correspondente.

#### Endpoints
#### Signup
Permite que um usuário crie uma conta na plataforma.
```bash
URL: /signup
Método: POST
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
```bash
URL: /login
Método: POST
Body:
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
```bash
URL: /posts
Método: POST
Body:
{
  "content": "string"
}
```
```bash
Resposta esperada:
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

```bash
URL: /posts
Método: GET
Resposta esperada:
 {    
 "id": "string",   
 "content": "string",   
 "creatorId": "string",   
 "createdAt": "string",   
 "likes": 0,   
 "comments": 0  }, 
```
#### Curtir um post
Permite que um usuário autenticado curta um post.
```bash
URL: /posts/:id/like
Método: PUT
Resposta esperada:
{
  "likes": 1
}
```

#### Descurtir um post
Permite que um usuário autenticado descurta um post.
```bash
URL: /posts/:id/dislike
Método: PUT
Resposta esperada:
{
  "likes": 0
}
```

#### Comentar em um post
Permite que um usuário autenticado comente em um post.

URL: /posts/:id/comments
Método: POST
