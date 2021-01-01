import { Injectable } from '@nestjs/common';
import { RespStatus } from "../interfaces/resp-status";
import { UsersEntity } from "./users.entity";

@Injectable()
export class UsersService {

    async getAll(): Promise<RespStatus> {
        const [users, count]: [UsersEntity[], number] = await UsersEntity.findAndCount();
        if (users.length > 0) {
            return {
                isSuccess: true,
                count: count,
                users: users,
            }
        } else {
            return {
                isSuccess: false,
                errors: ["Empty"],
            }
        }
    }

    async getOne(id: string): Promise<RespStatus> {
        const user: UsersEntity = await UsersEntity.findOne(id);
        if (user) {
            return {
                isSuccess: true,
                users: [user],
            }
        } else {
            return {
                isSuccess: false,
                errors: [`User (${id}) not found`],
            }
        }
    }

    async addOne(newUser: UsersEntity): Promise<RespStatus> {
        const user: UsersEntity = await UsersEntity.save(newUser);
        return {
            isSuccess: true,
            id: user.id,
        }
    }
}
