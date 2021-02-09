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

    async deleteOne(id: string): Promise<DiscountCodesResp> {
        const deleteResult = await DiscountCodesEntity.delete(id);
        console.log(deleteResult)

        if (deleteResult.affected === 0) {
            return {
                success: false,
                status: ResponseStatus.notFound,
                errors: [`Discount-code (${id}) not found`],
            }
        }

        return {
            success: true,
            status: ResponseStatus.ok,
        }

    }
}
