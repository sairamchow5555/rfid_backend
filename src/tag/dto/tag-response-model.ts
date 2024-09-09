import { GlobalResponseObject } from "libs/shared-models/global-response-object";
import { TagModel } from "./tag-model";

export class TagReponseModel extends GlobalResponseObject{
    data: TagModel[];

    constructor(
        status: boolean,
        intlCode: number,
        internalMessage: string,
        data: TagModel[],
    ){
        super(status, intlCode, internalMessage);
        this.status = status;
        this.intlCode = intlCode;
        this.internalMessage = internalMessage;
        this.data = data;
    }
}