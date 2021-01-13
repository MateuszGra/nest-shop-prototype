import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserData } from "../interfaces/users";
import { BasketEntity } from "../basket/basket.entity";

@Entity()
export class UsersEntity extends BaseEntity implements UserData {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @OneToMany(type => BasketEntity, entity => entity.user)
    productsInBasket: BasketEntity[];
}