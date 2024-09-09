import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TagStatusEnum } from "../dto/tag-status-enum";
import { TransitionFlowEntity } from "src/transition_flow/entities/transition_flow.entity";


@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

    @Column('varchar',{
        name: 'tag_id',
    })
    tagId: string;

    @Column('varchar',{
        name: 'tag_name',
    })
    tagName: string;

    @Column({
        name: 'status',
        type: 'enum',
        enum: TagStatusEnum,
        default: TagStatusEnum.Open
    })
    status: TagStatusEnum;

    @OneToMany(() => TransitionFlowEntity, (transitionFlow) => transitionFlow.tag)
    transitionFlows: TransitionFlowEntity[];
}
