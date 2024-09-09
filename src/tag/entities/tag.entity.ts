import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TagStatusEnum } from "../dto/tag-status-enum";


@Entity('tag')
export class TagEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;

    @Column('varchar',{
        name: 'tagId',
    })
    tagId: string;

    @Column({
        name: 'status',
        type: 'enum',
        enum: TagStatusEnum,
        default: TagStatusEnum.Open
    })
    status: TagStatusEnum;
}
