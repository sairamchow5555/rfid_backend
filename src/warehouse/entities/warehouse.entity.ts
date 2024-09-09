import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WareHouseStatusEnum } from '../dto/warehouse-status-enum';
@Entity('wareHouse')
export class WareHouseEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    name: 'wareHouseName',
  })
  wareHouseName: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: WareHouseStatusEnum,
    default: WareHouseStatusEnum.Active,
  })
  status: WareHouseStatusEnum;
}
