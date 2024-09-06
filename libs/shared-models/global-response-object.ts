export class GlobalResponseObject {
    status: boolean;
    intlCode: number;
    internalMessage: string;

     /**
     *
     * @param status
     * @param intlCode
     * @param internalMessage
     */
      constructor(status: boolean, intlCode: number, internalMessage: string){
        this.status = status;
        this.intlCode = intlCode;
        this.internalMessage = internalMessage;
    }
}

