import { ApiProperty } from "@nestjs/swagger";
import { TagStatusEnum } from "./tag-status-enum";

export class TagReq{
    @ApiProperty()
    id: number;

    @ApiProperty()
    tagId: string;

    @ApiProperty()
    tagName: string;

    @ApiProperty()
    status: TagStatusEnum;
}