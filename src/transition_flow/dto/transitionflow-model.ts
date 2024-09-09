import { TransitionFlowStatusEnum } from './transitionflow-status-enum';

export class TransitionFlowModel {
  id: number;
  warehouse: string;
  item: string;
  tag: string;
  status: TransitionFlowStatusEnum;

  constructor(
    id: number,
    warehouse: string,
    item: string,
    tag: string,
    status: TransitionFlowStatusEnum,
  ) {
    this.id = id;
    this.warehouse = warehouse;
    this.item = item;
    this.tag = tag;
    this.status = status;
  }
}
