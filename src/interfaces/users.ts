import { UsersEntity } from "../users/users.entity";
import { ResponseStatus } from "./response-status";

export enum UsersRole {
    user = 'user',
    guest = 'guest',
    admin = 'admin'
}

export interface UserData {
    id: string,
    name: string,
    surname: string,
    email: string,
    createdAt: Date,
    role: UsersRole,
}

export type UserResp = {
    isSuccess: true,
    status: ResponseStatus,
    users?: UsersEntity[],
    count?: number,
    id?: string,
} | {
    isSuccess: false,
    status: ResponseStatus,
    errors: string[],
}