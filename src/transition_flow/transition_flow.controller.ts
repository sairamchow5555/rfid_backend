import { Body, Controller, Post } from '@nestjs/common';
import { TransitionFlowService } from './transition_flow.service';
import { ApiTags } from '@nestjs/swagger';
import { TransitionFlowReponseModel } from './dto/transitionflow-response-model';
import { TransitionFlowModel } from './dto/transitionflow-model';
import { TransitionFlowIdReq } from './dto/transitionflow-id.req';

@ApiTags('transition-flow')
@Controller('transition-flow')
export class TransitionFlowController {
  constructor(private readonly transitionFlowService: TransitionFlowService) {}

  @Post('createTransitionFlow')
  async createTransitionFlow(
    @Body() transitionFlow: TransitionFlowModel,
  ): Promise<TransitionFlowReponseModel> {
    return this.transitionFlowService.createTransitionFlow(transitionFlow);
  }

  @Post('getAllTransitionFlow')
  async getAllTransitionFlow(): Promise<TransitionFlowReponseModel> {
    return this.transitionFlowService.getAllTransitionFlow();
  }

  @Post('deleteTransitionFlow')
  async deleteTransitionFlow(
    @Body() req: TransitionFlowIdReq,
  ): Promise<TransitionFlowReponseModel> {
    return this.transitionFlowService.deleteTransitionFlow(req);
  }
}
