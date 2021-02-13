import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasketData } from "../interfaces/basket";
import { UsersEntity } from "../users/users.entity";
import { ProductsEntity } from "../products/products.entity";


@Entity()
export class BasketsEntity extends BaseEntity implements BasketData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "int",
        precision: 6,
    })
    count: number;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        type: 'float',
        precision: 13,
        scale: 2,
    })
    totalPrice: number;

    @ManyToOne( type => ProductsEntity, entity => entity.basket )
    @JoinColumn()
    product: ProductsEntity;

    @ManyToOne( type => UsersEntity, entity => entity.productsInBasket )
    @JoinColumn()
    @Index()
    user: UsersEntity;
}
