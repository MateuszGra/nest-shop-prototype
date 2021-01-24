import {BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { ProductsEntity } from "../products/products.entity";
import { OrdersEntity } from "./orders.entity";
import { OrdersItemsData } from "../interfaces/orders";

@Entity()
export class OrdersItemsEntity extends BaseEntity implements OrdersItemsData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "int",
        precision: 6,
    })
    count: number;

    @ManyToOne( type => ProductsEntity, entity => entity.orders )
    @JoinColumn()
    product: ProductsEntity;

    @ManyToOne(type => OrdersEntity, entity => entity.orderItems)
    @JoinColumn()
    @Index()
    order: OrdersEntity;
}