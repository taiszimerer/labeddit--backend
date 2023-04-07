import { ServerStreamFileResponseOptionsWithError } from "http2"

export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
	name: string,
    role: USER_ROLES
}

export interface PostModel {
    id: string,
    creator: {
        id: string, 
        name: string
    },
    content: string,
    likes: number,
    comments: number,
    createdAt: string
}

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    comments: number,
    created_at: string
}
