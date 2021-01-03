import {UsersEntity} from "../users/users.entity";

export interface UserData {
    id: string,
    name: string,
    surname: string,
    email: string,
}

export type UserResp = {
    isSuccess: true,
    users?: UsersEntity[],
    count?: number,
    id?: string,
} | {
    isSuccess: false,
    errors: string[],
}