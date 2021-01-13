import {Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, UseInterceptors} from '@nestjs/common';
import { UsersService } from "./users.service";
import { UserResp } from "../interfaces/users";
import { registerUserDTO } from "./dto/register-user";
import {CacheInterceptor} from "../interceptors/cache.interceptor";
import {CacheTime} from "../decorators/cache-time.decorator";

@Controller('users')
export class UsersController {

    constructor(
        @Inject(UsersService) private usersService: UsersService,
    ) {
    }

    @Get('/')
    @UseInterceptors(CacheInterceptor)
    @CacheTime(10)
    async showAll(): Promise<UserResp> {
        return await this.usersService.getAll();
    }

    @Get('/:id')
    async showOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<UserResp> {
        return await this.usersService.getOne(id);
    }

    @Post('/')
    async register(
        @Body() newUser: registerUserDTO,
    ): Promise<UserResp> {
        return await this.usersService.register(newUser);
    }
}
