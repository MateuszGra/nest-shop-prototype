import { UsersEntity } from "../users/users.entity";
import { ResponseStatus } from "./response-status";

export interface UserData {
    id: string,
    name: string,
    surname: string,
    email: string,
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