import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TransitionFlowStatusEnum } from '../dto/transitionflow-status-enum';
import { ItemEntity } from 'src/items/entities/item.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { WareHouseEntity } from 'src/warehouse/entities/warehouse.entity';

@Entity('transition_flow')
export class TransitionFlowEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    name: 'date_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateTime: Date;

  @ManyToOne(() => WareHouseEntity, (warehouse) => warehouse.transitionFlows, {
    nullable: false,
  })
  warehouse: WareHouseEntity;

  @ManyToOne(() => ItemEntity, (item) => item.transitionFlows, {
    nullable: false,
  })
  item: ItemEntity;

  @ManyToOne(() => TagEntity, (tag) => tag.transitionFlows, { nullable: false })
  tag: TagEntity;

  @Column({
    type: 'enum',
    enum: TransitionFlowStatusEnum,
    default: TransitionFlowStatusEnum.Active,
  })
  status: TransitionFlowStatusEnum;
}
