import { PostModel } from "../types"

export interface GetPostInputDTO {
    token: string | undefined
}

export type GetPostOutputDTO = PostModel[]

export interface CreatePostInputDTO {
    token: string | undefined
    content: unknown
}

export interface EditPostInputDTO {
    idToEdit: string,
    token: string | undefined,
    content: unknown
}
export interface DeletePostInputDTO {
    idToDelete: string,
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