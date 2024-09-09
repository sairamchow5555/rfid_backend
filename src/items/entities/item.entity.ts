import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ItemStatusEnum } from "../dto/item-status-enum";

@Entity('item')
export class ItemEntity {
    @PrimaryGeneratedColumn({
        name: 'item_id',
    })
    id: number;

    @Column('varchar', {
        name: 'item_name',
    })
    itemName: string;

    @Column({
        name: 'status',
        type: 'enum',
        enum: ItemStatusEnum,
        default: ItemStatusEnum.Active
    })
    status: ItemStatusEnum;
}
