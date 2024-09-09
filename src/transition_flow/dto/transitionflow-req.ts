import { ApiProperty } from '@nestjs/swagger';
import { TransitionFlowStatusEnum } from './transitionflow-status-enum';

export class TransitionFlowReq {
  @ApiProperty()
  warehouse: string;

  @ApiProperty()
  item: string;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  status: TransitionFlowStatusEnum;
}
