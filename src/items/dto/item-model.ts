import { ItemStatusEnum } from "./item-status-enum";

export class ItemModel {
    id: number;
    itemName: string;
    status: ItemStatusEnum;

    constructor(id: number, itemName: string, status: ItemStatusEnum) {
        this.id = id;
        this.itemName = itemName;
        this.status = status;
    }
}
