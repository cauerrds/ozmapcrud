
export interface ICreateUserRequest {
    name: string
    email: string
    createdOn: Date
    updatedOn: Date
    birthdate: string
}

export interface IUser {
    id: number
    name: string
    email: string
    createdOn: Date
    updatedOn: Date
    birthdate: Date
}

export interface IUserResponse extends IUser {
    age: number
}

export interface IUpdateUserRequest {
    name?: string
    email?: string
}
