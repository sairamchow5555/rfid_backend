import { ApiProperty } from "@nestjs/swagger";

export class ItemIdReq{
    @ApiProperty()
    id: number;
}