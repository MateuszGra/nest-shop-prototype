import { Inject, Injectable } from '@nestjs/common';
import { UsersEntity } from "./users.entity";
import { UserResp } from "../interfaces/users";
import { ResponseStatus } from "../interfaces/response-status";
import { registerUserDTO } from "./dto/register-user";
import { MailService } from "../mail/mail.service";
import { registerEmailTemplate } from "../templates/email/register";

@Injectable()
export class UsersService {
    constructor(
        @Inject(MailService) private mailService: MailService,
    ) {
    }

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

    async register(newUser: registerUserDTO): Promise<UserResp> {
        const userExist = await UsersEntity.findOne({
            email: newUser.email,
        })
        if (userExist) {
            return {
                isSuccess: false,
                status: ResponseStatus.notAcceptable,
                errors: ['E-mail already in the database.']
            }
        }

        await this.mailService.sendMail(
            newUser.email,
            'Dziękujemy że do nas dołączyłeś.',
            registerEmailTemplate(newUser.name)
        )

        const user = new UsersEntity();
        Object.assign(user, newUser);
        await user.save();

        if (user) {
            return {
                isSuccess: true,
                status: ResponseStatus.ok,
                id: user.id,
            }
        }
    }
}
