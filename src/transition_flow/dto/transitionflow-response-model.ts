import { GlobalResponseObject } from 'libs/shared-models/global-response-object';
import { TransitionFlowModel } from './transitionflow-model';

export class TransitionFlowReponseModel extends GlobalResponseObject {
  data: TransitionFlowModel[];

  constructor(
    status: boolean,
    intlCode: number,
    internalMessage: string,
    data: TransitionFlowModel[],
  ) {
    super(status, intlCode, internalMessage);
    this.status = status;
    this.intlCode = intlCode;
    this.internalMessage = internalMessage;
    this.data = data;
  }
}
