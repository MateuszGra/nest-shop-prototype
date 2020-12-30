import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { RespStatus } from "../interfaces/resp-status";
import { UserService } from "./user.service";
import { UsersEntity } from "./users.entity";

@Controller('users')
export class Userscontroller {

    constructor(
        @Inject(UserService) private userService: UserService,
    ) {
    }

    @Get('/')

    async showAll(): Promise<RespStatus> {
        return await this.userService.getAll();
    }

    @Post('/')
    async addNew(
        @Body() newUser: UsersEntity,
    ): Promise<RespStatus> {
        return await this.userService.addOne(newUser);
    }
}
