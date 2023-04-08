[![Badge](https://img.shields.io/badge/author-Tais%20Marinheiro%20Zimerer-blue)](https://github.com/taiszimerer)
[![Badge](https://img.shields.io/badge/license-N/A-red)]()

## Labeddit Backend
Este é o backend do projeto Labeddit - Full Stack.


Labeddit é uma aplicação de rede social de posts e interações entre usuários. Os usuários podem fazer login ou criar um novo cadastro para acessar o feed de posts, onde podem ver os posts de outros usuários e criar seus próprios posts. A aplicação também permite aos usuários responder e interagir com as publicações, bem como curtir e comentar posts e comentários.

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
  "user":
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```


#### Login
Permite que um usuário faça login na plataforma, autenticando o usuário e devolvendo um token de acesso.

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
  "user": 
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  },
  "token": "string"
}
```

#### Criar um post
Permite que um usuário autenticado crie um novo post. Requer autenticação.

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
  "post":
  {
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

### Entrar em um post específico
Esse endpoint serve para acessar detalhes de um post específico, como likes e respostas de outros usuários.

URL: /posts/:id

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
Permite que um usuário autenticado curta um post.  Requer autenticação.

URL: /posts/:id/like

Método: PUT

Resposta esperada:
```bash

{
  "likes": 1
}
```

#### Descurtir um post
Permite que um usuário autenticado descurta um post. Requer autenticação.

URL: /posts/:id/dislike

Método: PUT

Resposta esperada:
```bash
{
  "likes": 0
}
```
#### Comentar em um post
Permite que um usuário autenticado comente em um post.  Requer autenticação.

URL: /posts/:id/comments

Método: POST

Resposta esperada: 
```bash
 {    
 "id": "string",   
 "content": "string",   
 "creator_id": "string",   
 "likes": 1,     
 "created_at": "string" 
 }
 ```
 
 #### Like ao comentario
 Endpoint que permite adicionar like a um comentário especifico.  Requer autenticação.
	
 URL: /comments/:id/like
	
 Método: PUT
	
 Resposta esperada:
 ```bash
  {    
  "id": "string",   
  "content": "string",   
  "creator_id": "string",     
  "likes": 1,   
  "created_at": "string"  
  }
  ```
  
 #### Dislike ao comentario
 Endpoint que permite adicionar dislike a um comentário especifico.  Requer autenticação.
	
 URL: /comments/:id/dislike
	
 Método: PUT
	
 Resposta esperada:
 ```bash
  {    
  "id": "string",   
  "content": "string",   
  "creator_id": "string",     
  "likes": 0,   
  "created_at": "string"  
  }
  ```
 
 
#### Deploy Backend do projeto:

#### Documentação API: 
https://documenter.getpostman.com/view/24460855/2s93XsWkhs

####  Repositório Frontend do projeto:
https://github.com/taiszimerer/labeddit-front

####  Deploy Frontend do projeto: 
t-labeddit.surge.sh

### Autoria e Contato

Este projeto foi desenvolvido por Tais Marinheiro Zimerer. Se você tiver dúvidas ou sugestões sobre o projeto, entre em contato pelo email taiszimerer@gmail.com.
  
  
  ### Considerações Finais
 Este projeto foi desenvolvido com o intuito de demonstrar a implementação de uma rede social basica usando ReactJs, JavaScript, Chakra Ui como biblioteca para o layout e integração com a API desenvolvida por mim no Backend do projeto. Esperamos que esse README tenha sido util para ajuda-lo a entender o funcionamento do projeto, e fazer o deploy em sua própria máquina. Se você tiver qualquer dúvida ou sugestão de melhoria, por favor, não hesite em entrar em contato comigo. Agradeço pelo interesse em meu projeto, espero que possa ser util para você em seus próprios projetos.






