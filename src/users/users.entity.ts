import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserData } from "../interfaces/users";

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
}