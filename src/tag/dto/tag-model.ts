import { TagStatusEnum } from "./tag-status-enum";

export class TagModel {
    id: number;
    tagId: string;
    tagName: string;
    status: TagStatusEnum;

    constructor(id: number, tagId: string, tagName: string, status: TagStatusEnum) {
        this.id = id;
        this.tagId = tagId;
        this.tagName = tagName
        this.status = status;
    }
}
