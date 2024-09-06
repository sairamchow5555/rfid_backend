import { GlobalResponseObject } from "libs/shared-models/global-response-object";
import { ItemModel } from "./item-model";

export class ItemReponseModel extends GlobalResponseObject{
    data: ItemModel[];

    constructor(
        status: boolean,
        intlCode: number,
        internalMessage: string,
        data: ItemModel[],
    ){
        super(status, intlCode, internalMessage);
        this.status = status;
        this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}