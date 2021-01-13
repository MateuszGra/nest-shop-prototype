import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CacheEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
    })
    @Index()
    controllerName: string;

    @Column({
        length: 100,
    })
    @Index()
    actionName: string;

    @Column()
    @Index()
    url: string;

    @Column({
        type: 'longtext',
    })
    dataJson: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}