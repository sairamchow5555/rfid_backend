import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TransitionFlowEntity } from './entities/transition_flow.entity';
import { TransitionFlowReq } from './dto/transitionflow-req';
import { TransitionFlowReponseModel } from './dto/transitionflow-response-model';
import { TransitionFlowModel } from './dto/transitionflow-model';
import { TransitionFlowStatusEnum } from './dto/transitionflow-status-enum';
import { TransitionFlowIdReq } from './dto/transitionflow-id.req';
import { ItemEntity } from 'src/items/entities/item.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { WareHouseEntity } from 'src/warehouse/entities/warehouse.entity';
import { ItemStatusEnum } from 'src/items/dto/item-status-enum';
import { TagStatusEnum } from 'src/tag/dto/tag-status-enum';
import { WareHouseStatusEnum } from 'src/warehouse/dto/warehouse-status-enum';

@Injectable()
export class TransitionFlowService {
  constructor(
    @InjectRepository(TransitionFlowEntity)
    private readonly transitionFlowRepository: Repository<TransitionFlowEntity>,
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(WareHouseEntity)
    private readonly warehouseRepository: Repository<WareHouseEntity>,

    private dataSource: DataSource,
  ) {}

  // Create Transition Flow
  async createTransitionFlow(
    dto: TransitionFlowReq,
  ): Promise<TransitionFlowReponseModel> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const warehouse = await this.warehouseRepository.findOne({
        where: { wareHouseName: dto.warehouse },
      });
      const item = await this.itemRepository.findOne({
        where: { itemName: dto.item },
      });
      const tag = await this.tagRepository.findOne({
        where: { tagId: dto.tag },
      });

      if (!warehouse || !item || !tag) {
        let invalidReference = [];
        if (!warehouse) invalidReference.push('warehouse');
        if (!item) invalidReference.push('item');
        if (!tag) invalidReference.push('tag');

        return new TransitionFlowReponseModel(
          false,
          0,
          `Invalid ${invalidReference} provided`,
          [],
        );
      }

      if (warehouse.status !== WareHouseStatusEnum.Active) {
        return new TransitionFlowReponseModel(
          false,
          0,
          'Warehouse is Inactive',
          [],
        );
      }

      if (item.status !== ItemStatusEnum.Active) {
        return new TransitionFlowReponseModel(false, 0, 'Item is Inactive', []);
      }

      if (tag.status !== TagStatusEnum.Open) {
        return new TransitionFlowReponseModel(false, 0, 'Tag is not open', []);
      }

      // Create and save the transition flow
      const transitionFlow = new TransitionFlowEntity();
      transitionFlow.warehouse = warehouse;
      transitionFlow.item = item;
      transitionFlow.tag = tag;
      transitionFlow.status = TransitionFlowStatusEnum.Active; // Default status

      const savedTransitionFlow = await queryRunner.manager
        .getRepository(TransitionFlowEntity)
        .save(transitionFlow);

      // Update the tag status to 'Inprogress'
      tag.status = TagStatusEnum.Inprogress;
      await queryRunner.manager.getRepository(TagEntity).save(tag);

      // Commit the transaction
      await queryRunner.commitTransaction();
      return new TransitionFlowReponseModel(true, 1, 'Created Successfully', [
        this.mapEntityToModel(savedTransitionFlow),
      ]);
    } catch (error) {
      // Rollback the transaction if any error occurs
      await queryRunner.rollbackTransaction();
      console.error(
        'Error occurred while creating Transition Flow:',
        error.message,
        error.stack,
      ); // Log error details
      throw new Error('Error occurred while creating Transition Flow');
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }

  // Get all Transition Flows
  async getAllTransitionFlow(): Promise<TransitionFlowReponseModel> {
    try {
      const items = await this.transitionFlowRepository.find({
        relations: ['warehouse', 'item', 'tag'],
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
        'Error occurred while retrieving Transition Flows:',
        error.message,
        error.stack,
      ); // Log error details
      throw new Error('Error occurred while retrieving Transition Flows');
    }
  }

  // Delete or Inactivate Transition Flow
  async deleteTransitionFlow(
    transitionFlowIdReq: TransitionFlowIdReq,
  ): Promise<TransitionFlowReponseModel> {
    try {
      const transitionFlow = await this.transitionFlowRepository.findOne({
        where: { id: transitionFlowIdReq.id },
        relations: ['tag'],
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

      // Update the related Tag status to 'Open'
      const tag = transitionFlow.tag;
      tag.status = TagStatusEnum.Open;
      await this.tagRepository.save(tag);

      return new TransitionFlowReponseModel(
        true,
        1,
        'Transition Flow Updated to InActive and Tag Status set to Open',
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
      warehouse: entity.warehouse.wareHouseName,
      item: entity.item.itemName,
      tag: entity.tag.tagId,
      status: entity.status,
    };
  }
}
