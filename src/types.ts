
export interface PostModel {
    id: string,
    creator: {
        id: string, 
        name: string
    },
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    createdAt: string
}

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    created_at: string
}
