import { Inject, Injectable } from '@nestjs/common';
import { UsersEntity } from "./users.entity";
import { UserFilteredResp, UserResp, UsersRole} from "../interfaces/users";
import { ResponseStatus } from "../interfaces/response-status";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { MailService } from "../mail/mail.service";
import { registerEmailTemplate } from "../templates/email/register";
import { DiscountCodesService } from "../discount-codes/discount-codes.service";
import { DiscountCodesResp } from "../interfaces/discount-codes";
import { EditUserDTO } from "./dto/edit-user.dto";
import { hashPwd } from "../utils/hash-pwd";

@Injectable()
export class UsersService {
    constructor(
        @Inject(MailService) private mailService: MailService,
        @Inject(DiscountCodesService) private discountCodesService: DiscountCodesService,
    ) {
    }

    filter(users: UsersEntity[]): UserFilteredResp[] {
        users.forEach( user => {
            delete user.pwdHash;
            delete user.currentTokenId;
        })
        return users;
    }

    async getAll(): Promise<UserResp> {
        const [users, count]: [UsersEntity[], number] = await UsersEntity.findAndCount();
        if (users.length > 0) {
            return {
                success: true,
                status: ResponseStatus.ok,
                count: count,
                users: this.filter(users),
            }
        } else {
            return {
                success: false,
                status: ResponseStatus.ok,
                errors: ["Empty"],
            }
        }
    }

    async getOne(user: UsersEntity): Promise<UserResp> {
        return {
            success: true,
            status: ResponseStatus.ok,
            users: this.filter([user]),
        }
    }

    async registerUser(newUser: RegisterUserDTO): Promise<UserResp> {
        const userExist = await UsersEntity.findOne({
            email: newUser.email,
        })
        if (userExist) {
            return {
                success: false,
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
        user.role = UsersRole.user;
        user.pwdHash = hashPwd(newUser.pwd)
        await user.save();

        if (user) {
            return {
                success: true,
                status: ResponseStatus.ok,
                id: user.id,
            }
        }
    }

    async registerGuest(): Promise<UserResp> {
        const guest = UsersEntity.create({
            role: UsersRole.guest
        });
        await guest.save();

        if (guest) {
            return {
                success: true,
                status: ResponseStatus.ok,
                id: guest.id,
            }
        }

    }

    async addDiscountCode(user: UsersEntity, discountCode: string): Promise<UserResp> {
        const codeResp: DiscountCodesResp = await this.discountCodesService.getOne(discountCode);
        if (!codeResp.success) return codeResp;

        if (!codeResp.upToDate) {
            return {
                success: false,
                status: ResponseStatus.notAcceptable,
                errors: ['Code is not up to date.'],
            }
        }

        if (user.discountCode) {
            const comparisonCode: DiscountCodesResp = this.discountCodesService.comparison(codeResp.codes[0], user.discountCode);
            if (!comparisonCode.success) return comparisonCode
        }

        await UsersEntity.update(user.id, {
            discountCode: codeResp.codes[0],
        })

        return {
            success: true,
            status: ResponseStatus.ok
        }
    }

    async editOne(editUser: EditUserDTO, user): Promise<UserResp> {
        await UsersEntity.update(user.id, editUser);
        return {
            success: true,
            status: ResponseStatus.ok,
        }
    }
}
