import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { UsersService } from "./users.service";
import { UserResp } from "../interfaces/users";
import { RegisterUserDTO } from "./dto/register-user.dto";
import { CacheInterceptor } from "../interceptors/cache.interceptor";
import { CacheTime } from "../decorators/cache-time.decorator";
import { EditUserDTO } from "./dto/edit-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserObj } from "../decorators/user-obj.decorator";
import { UsersEntity } from "./users.entity";

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

    @Get('/show-user')
    @UseGuards(AuthGuard('jwt'))
    async showOne(
        @UserObj() user: UsersEntity,
    ): Promise<UserResp> {
        return await this.usersService.getOne(user);
    }

    @Put('/edit-user')
    @UseGuards(AuthGuard('jwt'))
    async editOne(
        @Body() editUser: EditUserDTO,
        @UserObj() user: UsersEntity,
    ): Promise<UserResp> {
        return  await  this.usersService.editOne(editUser, user)
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

    @Post('/add-discount-code/:code')
    @UseGuards(AuthGuard('jwt'))
    async addDiscountCode(
        @UserObj() user: UsersEntity,
        @Param('code') discountCode: string,
    ): Promise<UserResp> {
        return await this.usersService.addDiscountCode(user, discountCode)
    }
}
