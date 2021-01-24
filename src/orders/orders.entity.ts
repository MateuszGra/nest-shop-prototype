import {BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { OrdersData } from "../interfaces/orders";
import { UsersEntity } from "../users/users.entity";
import { OrdersItemsEntity } from "./orders-items.entity";

@Entity()
export class OrdersEntity extends BaseEntity implements OrdersData {
    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @ManyToOne( type => UsersEntity, entity => entity.orders )
    @JoinColumn()
    user: UsersEntity;

    @OneToMany( type => OrdersItemsEntity, entity => entity.order)
    orderItems: OrdersItemsEntity[];
}