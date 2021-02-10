import { Injectable } from '@nestjs/common';
import { newDiscountCodeDTO } from "./dto/new-discount-code";
import { DiscountCodesResp } from "../interfaces/discount-codes";
import { DiscountCodesEntity } from "./discount-codes.entity";
import { ResponseStatus } from "../interfaces/response-status";
import { Equal } from "typeorm";

@Injectable()
export class DiscountCodesService {
    async addOne(newCode: newDiscountCodeDTO): Promise<DiscountCodesResp> {
        const findCode = await this.getOne(newCode.code)
        if (findCode.success) {
            return {
                success: false,
                status: ResponseStatus.notAcceptable,
                errors: ['Code already in the database.']
            }
        }

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

     validationCode(code: DiscountCodesEntity): boolean {
        const date = new Date();
        if(code.available === true) {
            if (code.startDate <= date && isNaN(code.endDate.getTime())) return true;
            else if (code.startDate <= date && code.endDate >= date) return true;
        }
        return false;
    }

    async getOne(codeNumber: string): Promise<DiscountCodesResp> {
        codeNumber = codeNumber.toUpperCase();
        const code = await DiscountCodesEntity.findOne({
            where: { code: Equal(codeNumber) }
        });
        if (!code) {
            return {
                success: false,
                status: ResponseStatus.notFound,
                errors: [`Discount-code (${codeNumber}) not found`],
            }
        }

        return {
            success: true,
            status: ResponseStatus.ok,
            upToDate: this.validationCode(code),
            codes: [code]
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

    async switchAvailableToFalse(code: DiscountCodesEntity): Promise<DiscountCodesResp> {
        if(code.oneTime) {
            await DiscountCodesEntity.update(code.id, {
                available: false
            })
        }
    }
}
