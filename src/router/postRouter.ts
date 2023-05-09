import express from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../../controller/postController'
import { PostDatabase } from '../database/PostDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const postRouter = express.Router()
const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get('/', postController.getPosts)
postRouter.post('/', postController.createPost)
postRouter.get("/:id", postController.getPostById)
postRouter.put("/:id/like", postController.likePost)
postRouter.put('/:id/dislike', postController.dislikePost)
postRouter.post('/:id/comments', postController.createCommentPost)
postRouter.get('/:id/comments', postController.getCommentsbyPostId)