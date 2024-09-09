import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ItemIdReq } from './dto/item-id.req';
import { ItemModel } from './dto/item-model';
import { ItemReponseModel } from './dto/item-response-model';
import { ItemService } from './item.service';

@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('createItem')
  async createItem(@Body() dto: ItemModel): Promise<ItemReponseModel> {
    return await this.itemService.createItem(dto);
  }

  @Post('updateItem/:id')
  async updateItem(
    @Param('id') id: number,
    @Body() dto: ItemModel,
  ): Promise<ItemReponseModel> {
    return await this.itemService.updateItem(id, dto);
  }

  @Post('getallActiveItems')
  async getAllItems(): Promise<ItemReponseModel> {
    return await this.itemService.getAllItems();
  }

  @Delete('deleteItems/:id')
  async deleteItem(@Param('id') id: number): Promise<ItemReponseModel> {
    return await this.itemService.deleteItem(+id);
  }
}
