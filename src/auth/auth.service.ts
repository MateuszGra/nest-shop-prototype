import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthLoginDto } from "./dto/auth-login.dto";
import { UsersEntity } from "../users/users.entity";
import { hashPwd } from "../utils/hash-pwd";
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from "./jwt.strategy";
import { ResponseStatus } from "../interfaces/response-status";

@Injectable()
export class AuthService {
    private accessTokenOptions: {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
    };

    private createToken(currentTokenId: string): { accessToken: string, expiresIn: number } {
        const payload: JwtPayload = {id: currentTokenId};
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(
            payload,
            'fjCNoo@w*fashdyashdu4qw6&^&R@&Y#*y7ttyy3T&^T@213784hHHDjjHwWUIEOSLmsaadsf177552',
            {expiresIn}
        );
        return {
            accessToken,
            expiresIn,
        };
    };

    private async generateToken(user: UsersEntity): Promise<string> {
        let token;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await UsersEntity.findOne({currentTokenId: token});
        } while (!!userWithThisToken);
        user.currentTokenId = token;
        await user.save();

        return token;
    };

    async login(req: AuthLoginDto, res: Response): Promise<any> {
        try {
            const user = await UsersEntity.findOne({
                email: req.email,
                pwdHash: hashPwd(req.pwd),
            });

            if (!user) {
                return res.json({error: 'Invalid login data!'});
            }

            const token = await this.createToken(await this.generateToken(user));

            return res
                .cookie('jwt', token.accessToken, this.accessTokenOptions)
                .json({
                    success: true,
                    status: ResponseStatus.ok,
                });
        } catch (e) {
            return res.json({
                success: false,
                status: ResponseStatus.notAcceptable,
                errors: [e.message]
            });
        }
    };

    async logout(user: UsersEntity, res: Response) {
        try {
            user.currentTokenId = null;
            await user.save();
            res.clearCookie('jwt', this.accessTokenOptions);
            return res.json({
                success: true,
                status: ResponseStatus.ok,
            });
        } catch (e) {
            return res.json({
                success: false,
                status: ResponseStatus.notAcceptable,
                errors: [e.message]
            });
        }
    }
}
