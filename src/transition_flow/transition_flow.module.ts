import { Module } from '@nestjs/common';
import { TransitionFlowService } from './transition_flow.service';
import { TransitionFlowController } from './transition_flow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransitionFlowEntity } from './entities/transition_flow.entity';
import { ItemEntity } from 'src/items/entities/item.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { WareHouseEntity } from 'src/warehouse/entities/warehouse.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransitionFlowEntity,
      ItemEntity,
      TagEntity,
      WareHouseEntity,
    ]),
  ],
  controllers: [TransitionFlowController],
  providers: [TransitionFlowService],
})
export class TransitionFlowModule {}
