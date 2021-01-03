import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UsersService } from "./users.service";
import { UsersEntity } from "./users.entity";
import { UserResp } from "../interfaces/users";

@Controller('users')
export class Userscontroller {

    constructor(
        @Inject(UsersService) private usersService: UsersService,
    ) {
    }

    @Get('/')

    async showAll(): Promise<UserResp> {
        return await this.usersService.getAll();
    }

    @Get('/:id')
    async showOne(
        @Param('id') id: string,
    ): Promise<UserResp> {
        return await this.usersService.getOne(id);
    }

    @Post('/')
    async register(
        @Body() newUser: UsersEntity,
    ): Promise<UserResp> {
        return await this.usersService.register(newUser);
    }
}
