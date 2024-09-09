import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItemStatusEnum } from "../dto/item-status-enum";
import { TransitionFlowEntity } from "src/transition_flow/entities/transition_flow.entity";

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

    @OneToMany(() => TransitionFlowEntity, (transitionFlow) => transitionFlow.item)
    transitionFlows: TransitionFlowEntity[];
}
