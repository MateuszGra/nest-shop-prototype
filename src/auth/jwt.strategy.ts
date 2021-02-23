import { Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersEntity } from '../users/users.entity';
import { PassportStrategy } from "@nestjs/passport";

export interface JwtPayload {
    id: string;
}

function cookieExtractor(req: any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: 'fjCNoo@w*fashdyashdu4qw6&^&R@&Y#*y7ttyy3T&^T@213784hHHDjjHwWUIEOSLmsaadsf177552',
        });
    }

    async validate(payload: JwtPayload, done: (error, user) => void) {
        if (!payload || !payload.id) {
            return done(new UnauthorizedException(), false);
        }

        const user = await UsersEntity.findOne({ currentTokenId: payload.id });
        if (!user) {
            return done(new UnauthorizedException(), false);
        }

        done(null, user);
    }
}