import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasketData } from "../interfaces/basket";
import { UsersEntity } from "../users/users.entity";
import { ProductsEntity } from "../products/products.entity";


@Entity()
export class BasketEntity extends BaseEntity implements BasketData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    count: number;

    @ManyToOne( type => ProductsEntity, entity => entity.basket )
    @JoinColumn()
    product: ProductsEntity;

    @ManyToOne( type => UsersEntity, entity => entity.productsInBasket )
    @JoinColumn()
    user: UsersEntity;
}
