import {BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { DiscountCodesData } from "../interfaces/discount-codes";
import { UsersEntity } from "../users/users.entity";

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
        type: "datetime"
    })
    startDate: Date;

    @Column({
        type: "datetime"
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

    @Column({
        type: "boolean",
        default: () => true,
    })
    available: boolean;

    @OneToMany(type => UsersEntity, entity => entity.discountCode)
    users: UsersEntity[];
}