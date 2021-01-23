import { BaseEntity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductsEntity } from "../products/products.entity";
import { OrdersEntity } from "./orders.entity";
import { OrdersItemsData } from "../interfaces/orders";

export class OrdersItemsEntity extends BaseEntity implements OrdersItemsData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    count: number;

    @ManyToOne( type => ProductsEntity, entity => entity.orders )
    @JoinColumn()
    product: ProductsEntity;

    @ManyToOne(type => OrdersEntity, entity => entity.orderItems)
    @JoinColumn()
    order: OrdersEntity;
}