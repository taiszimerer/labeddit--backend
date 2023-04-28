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