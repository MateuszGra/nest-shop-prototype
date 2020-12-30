import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BasketData } from "../interfaces/basket";


@Entity()
export class BasketEntity extends BaseEntity implements BasketData {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    count: number;
    @Column()
    productId: string;
    @Column()
    userId: string;
}
