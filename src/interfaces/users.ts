import {UsersEntity} from "../users/users.entity";

export interface UserData {
    id: string,
    name: string,
    surname: string,
    email: string,
}

export type UserResp = {
    isSuccess: true,
    status: number,
    users?: UsersEntity[],
    count?: number,
    id?: string,
} | {
    isSuccess: false,
    status: number,
    errors: string[],
}