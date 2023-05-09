import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness";
// import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostInputDTO, LikeOrDislikePostInputDTO } from "../src/dtos/postDTO";
import { BaseError } from "../errors/BaseError";
import { db } from "../knex";
const { v4: uuidv4 } = require('uuid'); // biblioteca para gerar ids únicos

export class PostController {
        constructor(
        private postBusiness: PostBusiness
    ) { }

//getPosts
public getPosts = async (req: Request, res: Response) => {
    try {
        const result = await db.select("*").from("posts")
        res.status(200).send(result)

    } catch (error) {
       console.log(error)
       if (error instanceof BaseError) {
           res.status(error.statusCode).send(error.message)
       } else {
            res.status(500).send("Erro inesperado")
       }
}
}

//createPost
public createPost = async (req: Request, res: Response) => {
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
}

//getPostById
public getPostById = async (req: Request, res: Response) => {
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
}

//likePost 
public likePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verifica se o post existe
        const post = await db('posts').where({ id }).first();
        if (!post) {
            return res.status(404).send('Post não encontrado');
        }

        // Atualiza o contador de likes do post
        await db('posts').where({ id }).increment('likes', 1);

        res.status(200).send('Like adicionado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar like');
    }
};

//dislikePost 
public dislikePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verifica se o post existe
        const post = await db('posts').where({ id }).first();
        if (!post) {
            return res.status(404).send('Post não encontrado');
        }

        // Atualiza o contador de likes do post
        await db('posts').where({ id }).increment('dislikes', 1);

        res.status(200).send('Dislike adicionado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao adicionar dislike');
    }
};

//createCommentPost
public createCommentPost = async (req: Request, res: Response) => {
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
};

//getCommentsbyPostId
public getCommentsByPostId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Verifica se o post existe
        const post = await db('posts').where({ id }).first();
        if (!post) {
            return res.status(404).send('Post não encontrado');
        }

        // Obtém todos os comentários do post
        const comments = await db('comments').where({ post_id: id });

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar comentários');
    }
};
}



//     public getPosts = async (req: Request, res: Response) => {
//         try {

//             const input: GetPostInputDTO = {
//                 token: req.headers.authorization
//             }

//             const output = await this.postBusiness.getPosts(input)
//             res.status(200).send(output)

//         } catch (error) {
//             console.log(error)
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro inesperado")
//             }
//         }
//     }

//     public createPost = async (req: Request, res: Response) => {
//         try {
//             const input: CreatePostInputDTO = {
//                 token: req.headers.authorization,
//                 content: req.body.content
//             }

//             const output = await this.postBusiness.createPost(input)
//             res.status(201).end()
//         } catch (error) {
//             console.log(error)
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro inesperado")
//             }
//         }
//     }

//     public editPost = async (req: Request, res: Response) => {
//         try {
//             const input: EditPostInputDTO = {
//                 idToEdit: req.params.id,
//                 content: req.body.content,
//                 token: req.headers.authorization
//             }

//             const output = await this.postBusiness.editPost(input)
//             res.status(200).end()
//         } catch (error) {
//             console.log(error)
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro inesperado")
//             }
//         }
//     }

//     public deletePost = async (req: Request, res: Response) => {
//         try {
//             const input: DeletePostInputDTO = {
//                 idToDelete: req.params.id,
//                 token: req.headers.authorization
//             }

//             const output = await this.postBusiness.deletePost(input)
//             res.status(200).end()
//         } catch (error) {
//             console.log(error)
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro inesperado")
//             }
//         }
//     }
    
//     public likeOrDislikePost = async (req: Request, res: Response) => {
//         try {
//             const input: LikeOrDislikePostInputDTO = {
//                 idToLikeOrDislike: req.params.id,
//                 token: req.headers.authorization,
//                 like: req.body.like
//             }

//             await this.postBusiness.likeOrDislikePost(input)
//             res.status(200).end()
//         } catch (error) {
//             console.log(error)
//             if (error instanceof BaseError) {
//                 res.status(error.statusCode).send(error.message)
//             } else {
//                 res.status(500).send("Erro inesperado")
//             }
//         }
//     }
// }