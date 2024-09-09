import { GlobalResponseObject } from "libs/shared-models/global-response-object";
import { WareHouseModel } from "./warehouse-model";

export class WareHouseResponseModel extends GlobalResponseObject{
    data: WareHouseModel[];

    constructor(
        status: boolean,
        intlCode: number,
        internalMessage: string,
        data: WareHouseModel[],
    ){
        super(status, intlCode, internalMessage);
        this.status = status;
        this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}