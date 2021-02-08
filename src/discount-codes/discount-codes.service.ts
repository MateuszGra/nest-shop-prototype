import { Injectable } from '@nestjs/common';
import { newDiscountCodeDTO } from "./dto/new-discount-code";
import { DiscountCodesResp } from "../interfaces/discount-codes";
import { DiscountCodesEntity } from "./discount-codes.entity";
import { ResponseStatus } from "../interfaces/response-status";

@Injectable()
export class DiscountCodesService {
    async addOne(newCode: newDiscountCodeDTO): Promise<DiscountCodesResp> {
        const code = new DiscountCodesEntity();
        newCode.code = newCode.code.toUpperCase();
        if (!newCode.startDate)  newCode.startDate = new Date();
        Object.assign(code, newCode);

        await code.save();
        if (code) {
            return {
                success: true,
                status: ResponseStatus.ok,
                id: code.id,
            }
        }
    }
}
