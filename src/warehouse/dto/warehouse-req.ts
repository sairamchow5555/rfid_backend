import { ApiProperty } from '@nestjs/swagger';
import { WareHouseStatusEnum } from './warehouse-status-enum';

export class WareHouseReq {
  @ApiProperty()
  id: number;

  @ApiProperty()
  wareHouseName: string;

  @ApiProperty()
  status: WareHouseStatusEnum;
}
