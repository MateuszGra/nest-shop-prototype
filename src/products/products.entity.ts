import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductsData } from "../interfaces/products";
import { BasketsEntity } from "../baskets/baskets.entity";
import { OrdersItemsEntity } from "../orders/orders-items.entity";

@Entity()
export class ProductsEntity extends BaseEntity implements ProductsData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    availability: number;

    @Column({
        type: 'longtext',
    })
    description: string;

    @Column({
        type: "float",
        precision: 7,
        scale: 2,
    })
    price: number

    @OneToMany(type => BasketsEntity, entity => entity.product)
    basket: BasketsEntity[];

    @OneToMany(type => OrdersItemsEntity, entity => entity.product)
    orders: OrdersItemsEntity[];
}