import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransitionFlowStatusEnum } from '../dto/transitionflow-status-enum';

@Entity('transition_flow')
export class TransitionFlowEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    name: 'date_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_time: Date;

  @Column({ type: 'varchar', name: 'warehouse' })
  warehouse: string;

  @Column({ type: 'varchar', name: 'item' })
  item: string;

  @Column({ type: 'varchar', name: 'tag' })
  tag: string;

  @Column({
    type: 'enum',
    enum: TransitionFlowStatusEnum,
    default: TransitionFlowStatusEnum.Active,
  })
  status: TransitionFlowStatusEnum;
}
