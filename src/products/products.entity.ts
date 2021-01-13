import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductsData } from "../interfaces/products";
import { BasketEntity } from "../basket/basket.entity";

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

    @OneToMany(type => BasketEntity, entity => entity.product)
    basket: BasketEntity;
}