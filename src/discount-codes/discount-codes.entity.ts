import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { DiscountCodesData } from "../interfaces/discount-codes";

@Entity()
export class DiscountCodesEntity extends BaseEntity implements DiscountCodesData  {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
    })
    @Index()
    code: string;

    @Column({
        type: "date"
    })
    startDate: Date;

    @Column({
        type: "date"
    })
    endDate: Date;

    @Column({
        type: "boolean",
        default: () => false,
    })
    oneTime: boolean;

    @Column({
        type: "int",
        precision: 3,
    })
    promotion: number;

}