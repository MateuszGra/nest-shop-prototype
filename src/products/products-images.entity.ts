import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductsEntity } from "./products.entity";

@Entity()
export class ProductsImagesEntity extends BaseEntity  {
    @PrimaryGeneratedColumn('uuid')
    @Index()
    id: string;

    @Column({
        length: 100,
        default: null,
        nullable: true,
    })
    photoFn: string;

    @ManyToOne(type => ProductsEntity, entity => entity.images)
    @JoinColumn()
    product: ProductsEntity;
}