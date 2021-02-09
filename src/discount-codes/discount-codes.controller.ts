import { Body, Controller, Delete, Inject, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { DiscountCodesService } from "./discount-codes.service";
import { newDiscountCodeDTO } from "./dto/new-discount-code";
import { DiscountCodesResp } from "../interfaces/discount-codes";

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

    @Delete('/:id')
    async delete(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<DiscountCodesResp> {
        return await this.discountCodesService.deleteOne(id);
    }
}
