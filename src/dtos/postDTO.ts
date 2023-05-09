import { PostModel } from "../models/Post"

export interface GetPostsInputDTO {
    token: string | undefined
}

export type GetPostsOutputDTO = PostModel[]

export interface CreatePostInputDTO {
    token: string | undefined,
    content: unknown
}

export interface GetPostByIdInputDTO {
    idPost: string,
    token: string | undefined
}

export interface LikePostInputDTO {
    idToLike: string,
    token: string | undefined, 
    like: unknown
}
export interface DislikePostInputDTO {
    idToDislike: string,
    token: string | undefined, 
    dislike: unknown
}

export interface CreateCommentPostInputDTO {
    token: string | undefined,
    content: unknown
}
export interface GetCommentByPostIdInputDTO {
    idPost: string,
    token: string | undefined,
}