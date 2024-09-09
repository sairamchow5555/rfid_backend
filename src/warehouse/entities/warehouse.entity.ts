import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WareHouseStatusEnum } from '../dto/warehouse-status-enum';
import { TransitionFlowEntity } from 'src/transition_flow/entities/transition_flow.entity';
@Entity('warehouse')
export class WareHouseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'warehouse_name',
  })
  wareHouseName: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: WareHouseStatusEnum,
    default: WareHouseStatusEnum.Active,
  })
  status: WareHouseStatusEnum;

  @OneToMany(() => TransitionFlowEntity, (transitionFlow) => transitionFlow.warehouse)
  transitionFlows: TransitionFlowEntity[];
}
