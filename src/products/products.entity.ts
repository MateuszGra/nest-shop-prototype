import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ProductsData } from "../interfaces/products";

@Entity()
export class ProductsEntity extends BaseEntity implements ProductsData {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    availability: number;
    @Column({
        length: 10000,
    })
    description: string;
    @Column()
    price: number
}