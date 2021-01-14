import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrdersData } from "../interfaces/orders";
import { UsersEntity } from "../users/users.entity";
import { ProductsEntity } from "../products/products.entity";

@Entity()
export class OrdersEntity extends BaseEntity implements OrdersData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    count: number;

    @Column()
    createdAt: Date;

    @Column('uuid')
    @Index()
    orderNumber: string;

    @ManyToOne( type => ProductsEntity, entity => entity.orders )
    @JoinColumn()
    product: ProductsEntity;

    @ManyToOne( type => UsersEntity, entity => entity.orders )
    @JoinColumn()
    user: UsersEntity;
}