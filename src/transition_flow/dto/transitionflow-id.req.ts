import { ApiProperty } from '@nestjs/swagger';

export class TransitionFlowIdReq {
  @ApiProperty()
  id: number;
}
