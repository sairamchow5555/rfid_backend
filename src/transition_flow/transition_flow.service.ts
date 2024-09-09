import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransitionFlowEntity } from './entities/transition_flow.entity';
import { Repository } from 'typeorm';
import { TransitionFlowReq } from './dto/transitionflow-req';
import { TransitionFlowReponseModel } from './dto/transitionflow-response-model';
import { TransitionFlowModel } from './dto/transitionflow-model';
import { TransitionFlowStatusEnum } from './dto/transitionflow-status-enum';
import { TransitionFlowIdReq } from './dto/transitionflow-id.req';

@Injectable()
export class TransitionFlowService {
  constructor(
    @InjectRepository(TransitionFlowEntity)
    private readonly transitionFlowRepository: Repository<TransitionFlowEntity>,
  ) {}

  // create Transition Flow
  async createTransitionFlow(
    dto: TransitionFlowReq,
  ): Promise<TransitionFlowReponseModel> {
    try {
      const Obj = new TransitionFlowEntity();
      Obj.warehouse = dto.warehouse;
      Obj.item = dto.item;
      Obj.tag = dto.tag;
      Obj.status = TransitionFlowStatusEnum.Active; // Set default status

      const saveObj = await this.transitionFlowRepository.save(Obj);
      if (saveObj) {
        return new TransitionFlowReponseModel(true, 1, 'Created Successfully', [
          this.mapEntityToModel(saveObj),
        ]);
      } else {
        return new TransitionFlowReponseModel(false, 0, 'Failed to Create', []);
      }
    } catch (error) {
      console.error(
        'Error occurred while creating Item:',
        error.message,
        error.stack,
      ); // Log error details
      throw new Error('Error occurred while creating Item');
    }
  }

  // Get all transitions items
  async getAllTransitionFlow(): Promise<TransitionFlowReponseModel> {
    try {
      const items = await this.transitionFlowRepository.find({
        where: { status: TransitionFlowStatusEnum.Active },
      });

      if (items.length === 0) {
        return new TransitionFlowReponseModel(
          false,
          0,
          'No Active Items Found',
          [],
        );
      }

      const transitionsFlowModels = items.map((item) =>
        this.mapEntityToModel(item),
      );
      return new TransitionFlowReponseModel(
        true,
        1,
        'Active Items Retrieved',
        transitionsFlowModels,
      );
    } catch (error) {
      console.error(
        'Error occurred while retrieving Items:',
        error.message,
        error.stack,
      ); // Log error details
      throw new Error('Error occurred while retrieving Items');
    }
  }

  // delete or inactive
  async deleteTransitionFlow(
    transitionFlowIdReq: TransitionFlowIdReq,
  ): Promise<TransitionFlowReponseModel> {
    try {
      const transitionFlow = await this.transitionFlowRepository.findOne({
        where: { id: transitionFlowIdReq.id },
      });

      if (!transitionFlow) {
        return new TransitionFlowReponseModel(
          false,
          0,
          'Transition Flow Not Found',
          [],
        );
      }

      // Update the status to InActive
      transitionFlow.status = TransitionFlowStatusEnum.InActive;
      await this.transitionFlowRepository.save(transitionFlow);

      return new TransitionFlowReponseModel(
        true,
        1,
        'Transition Flow Updated to InActive',
        [],
      );
    } catch (error) {
      console.error(
        'Error occurred while updating Transition Flow:',
        error.message,
        error.stack,
      ); // Log error details
      throw new Error('Error occurred while updating Transition Flow');
    }
  }

  // Helper function to map Entity to Model
  private mapEntityToModel(entity: TransitionFlowEntity): TransitionFlowModel {
    return {
      id: entity.id,
      warehouse: entity.warehouse,
      item: entity.item,
      tag: entity.tag,
      status: entity.status,
    };
  }
}
