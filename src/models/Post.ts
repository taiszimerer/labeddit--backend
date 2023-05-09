
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

export class Post {
    constructor(
        private id: string,
        private creatorId: string,
        private creatorName: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private comments: number,
        private createdAt: string,       
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value 
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value 
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value 
    }
    
    public addLike (){
        this.likes += 1 
    }

    public addDislike (){
        this.dislikes += 1 
    }
    
    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value 
    }

    public getComments(): number {
        return this.comments
    }

    public setComments(value: number): void {
        this.comments = value 
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value 
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value 
    }

    public getCreatorName(): string {
        return this.creatorName
    }

    public setCreatorName(value: string): void {
        this.creatorName = value 
    }

    public toDBModel(): PostDB {   //ps: o formato DB é com underline_
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments: this.comments,
            created_at: this.createdAt,
        }
    }

    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments: this.comments,
            createdAt: this.createdAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            }
        }
    }
}