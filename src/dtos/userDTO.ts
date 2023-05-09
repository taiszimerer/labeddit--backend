import { UserModel } from "../models/User"

export interface GetUsersInputDTO {
    token: string | undefined
}

export type GetUsersOutputDTO = UserModel[]

export interface SignupInputDTO {
    name: unknown,
    email: unknown,
    password: unknown

}
export interface SignupOutputDTO {
    token: string
}

export interface LoginInputDTO {
    email: unknown,
    password: unknown

}
export interface LoginOutputDTO {
    token: string
}

