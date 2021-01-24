import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserData, UsersRole }  from "../interfaces/users";
import { BasketsEntity } from "../baskets/baskets.entity";
import { OrdersEntity } from "../orders/orders.entity";

@Entity()
export class UsersEntity extends BaseEntity implements UserData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
    })
    name: string;

    @Column({
        length: 100,
    })
    surname: string;

    @Column({
        length: 100,
    })
    email: string;

    @Column()
    role: UsersRole;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @OneToMany(type => BasketsEntity, entity => entity.user)
    productsInBasket: BasketsEntity[];

    @OneToMany(type => OrdersEntity, entity => entity.user)
    orders: OrdersEntity[];
}