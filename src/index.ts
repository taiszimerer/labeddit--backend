import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { db } from './knex'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})
const { v4: uuidv4 } = require('uuid'); // biblioteca para gerar ids únicos

//getAllUsers
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.select("*").from("users")
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//Signup
app.post('/users/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const createdAt = new Date().toISOString(); // define a data de criação do usuário como a data atual
        const id = uuidv4(); // gera um id único para o novo usuário

        await db('users').insert({
            id,
            name,
            email,
            password,
            role: 'user',
            created_at: createdAt
        });

        res.status(201).send('Usuário criado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar usuário');
    }
});

//Login
app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db('users').select('*').where({ email }).first();
        if (!user) {
            return res.status(401).send({ message: 'Email ou senha inválidos' });
        }
        if (user.password !== password) {
            return res.status(401).send({ message: 'Email ou senha inválidos' });
        }
        return res.status(200).send({ message: 'Login realizado com sucesso' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Erro ao fazer login' });
    }
});

//getPosts
app.get('/posts', async (req: Request, res: Response) => {
    try {
        const result = await db.select("*").from("posts")
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//createPost
app.post('/posts', async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const createdAt = new Date().toISOString();
        const id = uuidv4(); // gera um id único para o novo usuário

        await db('posts').insert({
            id,
            creator_id: "i",    // mexer futuramente quando tiver o token.
            content,
            likes: 0,
            dislikes: 0,
            comments: 0,
            created_at: createdAt
        });

        res.status(201).send('Post criado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar post');
    }
})

//GetPostById
app.get('/posts/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = await db.select("*").from("posts").where("id", "=", id)

        if (!result) {
            res.status(400)
            throw new Error("Post não existente")
        }

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//LikePost PENDENTE
app.put('/posts/:id/like', async (req: Request, res: Response) => {
    try {
        const id = req.params.id 
        const result = await db("posts").where("id", id).increment("likes", 1)

        if (!result) {
            res.status(400)
            throw new Error("Post não existente")
        }

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// //DislikePost PENDENTE
// app.put('/posts/:id/dislike', async (req: Request, res: Response) => {
//     try {
//         const {id }= req.params
//         const result = await db.select("*").from("posts").where({id}).increment("dislikes", 1)

//         if (!result) {
//             res.status(400)
//             throw new Error("Dislike não adicionado")
//         }

//         res.status(200).send(result)
//     } catch (error: any) {
//         console.log(error)
//         if (res.statusCode === 200) {
//             res.status(500)
//         }
//         res.send(error.message)
//     }
// })


//


//CreateCommentPost
app.post('/posts/:id/comments', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const createdAt = new Date().toISOString();
        const commentId = uuidv4(); // gera um id único para o novo comentário

        // Verifica se o post existe
        const post = await db('posts').where({ id }).first();
        if (!post) {
            return res.status(404).send('Post não encontrado');
        }

        // Insere o novo comentário no banco de dados
        await db('comments').insert({
            id: commentId,
            post_id: id,
            creator_id: "i", // mexer futuramente quando tiver o token.
            content,
            created_at: createdAt
        });

        // Atualiza o contador de comentários do post
         await db('posts').where({ id }).increment('comments', 1);

        res.status(201).send('Comentário criado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar comentário');
    }
});




