import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { UsersService } from "./users.service";
import { UserResp } from "../interfaces/users";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { CacheInterceptor } from "../interceptors/cache.interceptor";
import { CacheTime } from "../decorators/cache-time.decorator";
import { AddDiscountCodeDTO } from "./dto/add-discount-code.dto";
import { EditUserDTO } from "./dto/edit-user.dto";

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

    @Put('/:id')
    async editOne(
        @Body() editUser: EditUserDTO,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<UserResp> {
        return  await  this.usersService.editOne(editUser, id)
    }

    @Post('/register-user')
    async registerUser(
        @Body() newUser: RegisterUserDTO,
    ): Promise<UserResp> {
        return await this.usersService.registerUser(newUser);
    }

    @Post('/register-guest')
    async registerGuest(): Promise<UserResp> {
        return await this.usersService.registerGuest();
    }

    @Post('/add-discount-code/')
    async addDiscountCode(
        @Body() discountCode: AddDiscountCodeDTO,
    ): Promise<UserResp> {
        return await this.usersService.addDiscountCode(discountCode)
    }
}
