import { Injectable } from '@nestjs/common';
import { UsersEntity } from "./users.entity";
import { UserResp } from "../interfaces/users";
import { ResponseStatus } from "../interfaces/response-status";

@Injectable()
export class UsersService {

    async getAll(): Promise<UserResp> {
        const [users, count]: [UsersEntity[], number] = await UsersEntity.findAndCount();
        if (users.length > 0) {
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                count: count,
                users: users,
            }
        } else {
            return {
                isSuccess: false,
                status: ResponseStatus.ok,
                errors: ["Empty"],
            }
        }
    }

    async getOne(id: string): Promise<UserResp> {
        const user: UsersEntity = await UsersEntity.findOne(id);
        if (user) {
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                users: [user],
            }
        } else {
            return {
                isSuccess: false,
                status: ResponseStatus.notFound,
                errors: [`User (${id}) not found`],
            }
        }
    }

    async register(newUser: UsersEntity): Promise<UserResp> {
        const user: UsersEntity = await UsersEntity.save(newUser);
        return {
            isSuccess: true,
            status: ResponseStatus.ok,
            id: user.id,
        }
    }
}
