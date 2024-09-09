import { ApiProperty } from "@nestjs/swagger";

export class WareHouseIdReq{
    @ApiProperty()
    id: number;
}