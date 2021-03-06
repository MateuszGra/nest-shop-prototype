import {BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ProductsData } from "../interfaces/products";
import { BasketsEntity } from "../baskets/baskets.entity";
import { OrdersItemsEntity } from "../orders/orders-items.entity";
import {ProductsImagesEntity} from "./products-images.entity";

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
        length: 100,
    })
    category: string;

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

    @Column({
        type: "int",
        precision: 3,
    })
    promotion: number

    @Column({
        type: "int",
        precision: 9,
    })
    promotionPrice: number;

    @OneToMany(type => BasketsEntity, entity => entity.product)
    basket: BasketsEntity[];

    @OneToMany(type => OrdersItemsEntity, entity => entity.product)
    orders: OrdersItemsEntity[];

    @OneToMany(type => ProductsImagesEntity, entity => entity.product)
    images: ProductsImagesEntity[];
}