import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemModel } from "./dto/item-model";
import { ItemIdReq } from "./dto/item-id.req";
import { ItemReponseModel } from "./dto/item-response-model";
import { ItemStatusEnum } from "./dto/item-status-enum";
import { ItemReq } from "./dto/item-req";
import { ItemEntity } from "./entities/item.entity";

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemEntity)
        private readonly itemRepository: Repository<ItemEntity>
    ) {}

    // Create item
    async createItem(dto: ItemReq): Promise<ItemReponseModel> {
        try {
            const itemObj = new ItemEntity();
            itemObj.itemName = dto.itemName;
            itemObj.status = dto.status;

            const savedItem = await this.itemRepository.save(itemObj);
            if (savedItem) {
                return new ItemReponseModel(true, 1, 'Item Created Successfully', [savedItem]);
            } else {
                return new ItemReponseModel(false, 0, 'Failed to Create Item',[]);
            }
        } catch (error) {
            throw new Error('Error occurred while creating Item');
        }
    }

    // Update item
    async updateItem(id: number, dto: ItemReq): Promise<ItemReponseModel> {
        try {
            const item = await this.itemRepository.findOne({ where: {id} });

            if (!item) {
                return new ItemReponseModel(false, 0, 'Item Not Found',[]);
            }

            item.itemName = dto.itemName;
            item.status = dto.status;

            const savedItem = await this.itemRepository.save(item);
            return new ItemReponseModel(true, 1, 'Item Updated Successfully', [savedItem]);
        } catch (error) {
            throw new Error('Error occurred while updating Item');
        }
    }

    // Get all active items
    async getAllItems(): Promise<ItemReponseModel> {
        try {
            const items = await this.itemRepository.find({ where: { status: ItemStatusEnum.Active } });

            if (items.length === 0) {
                return new ItemReponseModel(false, 0, 'No Active Items Found', []);
            }

            return new ItemReponseModel(true, 1, 'Active Items Retrieved', items);
        } catch (error) {
            throw new Error('Error occurred while retrieving items');
        }
    }

    // Delete item (set status to InActive)
    async deleteItem(id: number): Promise<ItemReponseModel> {
        try {
            const item = await this.itemRepository.findOne({ where: {id} });

            if (!item) {
                return new ItemReponseModel(false, 0, 'Item Not Found', []);
            }

            item.status = ItemStatusEnum.InActive;
            const updatedItem = await this.itemRepository.save(item);

            return new ItemReponseModel(true, 1, 'Item Deleted (Set to InActive)', [updatedItem]);
        } catch (error) {
            throw new Error('Error occurred while deleting item');
        }
    }
}
