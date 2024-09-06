import { ApiProperty } from "@nestjs/swagger";
import { ItemStatusEnum } from "./item-status-enum";

export class ItemReq {
    @ApiProperty()
    id: number;

    @ApiProperty()
    itemName: string;

    @ApiProperty()
    status: ItemStatusEnum;
}
