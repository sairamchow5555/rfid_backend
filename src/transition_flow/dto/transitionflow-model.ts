import { TransitionFlowStatusEnum } from './transitionflow-status-enum';

export class TransitionFlowModel {
  id: number;
  warehouse: string;
  item: string;
  tag: string;
  status: TransitionFlowStatusEnum;
  tagName?: string;

  constructor(
    id: number,
    warehouse: string,
    item: string,
    tag: string,
    status: TransitionFlowStatusEnum,
    tagName?: string,
  ) {
    this.id = id;
    this.warehouse = warehouse;
    this.item = item;
    this.tag = tag;
    this.status = status;
    this.tagName = tagName;
  }
}
