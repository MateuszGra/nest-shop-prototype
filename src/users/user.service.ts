import { Injectable } from '@nestjs/common';
import {RespStatus} from "../interfaces/resp-status";
import {UserData} from "../interfaces/users";
import {UsersEntity} from "./users.entity";

@Injectable()
export class UserService {

    async getAll(): Promise<RespStatus> {
        const [users, count]: [UserData[], number] = await UsersEntity.findAndCount();
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

    async addOne(newUser: UsersEntity): Promise<RespStatus> {
        const user = await UsersEntity.save(newUser);
        return {
            isSuccess: true,
            id: user.id,
        }
    }
}
