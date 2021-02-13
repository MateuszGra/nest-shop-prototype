import {Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put} from '@nestjs/common';
import { DiscountCodesService } from "./discount-codes.service";
import { newDiscountCodeDTO } from "./dto/new-discount-code";
import { DiscountCodesResp } from "../interfaces/discount-codes";
import {editDiscountCodeDTO} from "./dto/edit-discount-code";

@Controller('discount-codes')
export class DiscountCodesController {

    constructor(
        @Inject(DiscountCodesService) private discountCodesService: DiscountCodesService,
    ) {
    }

    @Post('/')
    async addNew(
        @Body() newCode: newDiscountCodeDTO,
    ): Promise<DiscountCodesResp> {
        return await this.discountCodesService.addOne(newCode);
    }

    @Get('/:code')
    async getOne(
        @Param('code') code: string,
    ): Promise<DiscountCodesResp> {
        return await this.discountCodesService.getOne(code)
    }

    @Delete('/:id')
    async delete(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<DiscountCodesResp> {
        return await this.discountCodesService.deleteOne(id);
    }

    @Put('/:id')
    async edit (
        @Body() editCode: editDiscountCodeDTO,
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<DiscountCodesResp> {
        return await this.discountCodesService.editOne(editCode, id);
    }
}
