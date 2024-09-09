import { ApiProperty } from "@nestjs/swagger";

export class TagIdReq{
    @ApiProperty()
    id: number;
}