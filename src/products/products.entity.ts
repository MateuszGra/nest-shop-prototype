import {BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ProductsData } from "../interfaces/products";
import { BasketsEntity } from "../baskets/baskets.entity";
import { OrdersItemsEntity } from "../orders/orders-items.entity";

@Entity()
export class ProductsEntity extends BaseEntity implements ProductsData {
    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;

    @Column({
        length: 300,
    })
    name: string;

    @Column({
        type: "int",
        precision: 6,
    })
    availability: number;

    @Column({
        type: 'longtext',
    })
    description: string;

    @Column({
        type: "int",
        precision: 9,
    })
    price: number

    @Column({
        type: "int",
    })
    sold: number

    @OneToMany(type => BasketsEntity, entity => entity.product)
    basket: BasketsEntity[];

    @OneToMany(type => OrdersItemsEntity, entity => entity.product)
    orders: OrdersItemsEntity[];
}