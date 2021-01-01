import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { RespStatus } from "../interfaces/resp-status";
import { UsersService } from "./users.service";
import { UsersEntity } from "./users.entity";

@Controller('users')
export class Userscontroller {

    constructor(
        @Inject(UsersService) private usersService: UsersService,
    ) {
    }

    @Get('/')

    async showAll(): Promise<RespStatus> {
        return await this.usersService.getAll();
    }

    @Post('/')
    async addNew(
        @Body() newUser: UsersEntity,
    ): Promise<RespStatus> {
        return await this.usersService.addOne(newUser);
    }
}
