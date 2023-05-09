import { Request, Response } from "express"
// import { UserBusiness } from "../business/UserBusiness"
// import { LoginInputDTO, SignupInputDTO} from "../src/dtos/userDTO"
// import { BaseError } from "../errors/BaseError"
import { db } from '../knex'
import { BaseError } from "../errors/BaseError";
const { v4: uuidv4 } = require('uuid'); // biblioteca para gerar ids únicos

export class UserController {

//getUsers
public getUsers = async (req: Request, res: Response) => {
    try {
        const result = await db.select("*").from("users")
        res.status(200).send(result)
        } catch (error: any) {
            console.log(error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
}

//Signup
public signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const createdAt = new Date().toISOString(); // define a data de criação do usuário como a data atual
        const id = uuidv4(); // gera um id único para o novo usuário

        await db('users').insert({
            id,
            name,
            email,
            password,
            role: "NORMAL",
            created_at: createdAt
        });

        res.status(201).send('Usuário criado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao criar usuário');
    }
};

//Login
public login = async (req: Request, res: Response) => {
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
};
}







//     constructor(
//         private userBusiness: UserBusiness
//     ) { }

    

//     public singup = async (req: Request, res: Response) => {
//         try {
//             const input: SignupInputDTO = {
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: req.body.password
//             }

//             const output = await this.userBusiness.singup(input)
//             res.status(201).send(output)

//         } catch (error) {
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro inesperado")
//             }
//         }
//     }
    
//     public login = async (req: Request, res: Response) => {
//         try {
//             const input: LoginInputDTO = {
//                 email: req.body.email,
//                 password: req.body.password,
//             }

//             const output = await this.userBusiness.login(input)
//             res.status(200).send(output)

//         } catch (error) {
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro inesperado")
//             }
//         }
//     }

// 