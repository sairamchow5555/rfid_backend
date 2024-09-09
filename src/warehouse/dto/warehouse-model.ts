import { WareHouseStatusEnum } from './warehouse-status-enum';

export class WareHouseModel {
  id: number;
  wareHouseName: string;
  status: WareHouseStatusEnum;

  constructor(id: number, wareHouseName: string, status: WareHouseStatusEnum) {
    this.id = id;
    this.wareHouseName = wareHouseName;
    this.status = status;
  }
}
