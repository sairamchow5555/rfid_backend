import { Module } from '@nestjs/common';
import { TransitionFlowService } from './transition_flow.service';
import { TransitionFlowController } from './transition_flow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransitionFlowEntity } from './entities/transition_flow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransitionFlowEntity])],
  controllers: [TransitionFlowController],
  providers: [TransitionFlowService],
})
export class TransitionFlowModule {}
