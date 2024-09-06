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

  @Post('create')
  async createItem(@Body() dto: ItemModel): Promise<ItemReponseModel> {
    return await this.itemService.createItem(dto);
  }

  @Put('update/:id')
  async updateItem(
    @Param('id') id: number,
    @Body() dto: ItemModel,
  ): Promise<ItemReponseModel> {
    return await this.itemService.updateItem(id, dto);
  }

  @Post('allActive')
  async getAllItems(): Promise<ItemReponseModel> {
    return await this.itemService.getAllItems();
  }

  @Delete('delete')
  async deleteItem(@Body() req: ItemIdReq): Promise<ItemReponseModel> {
    return await this.itemService.deleteItem(req);
  }
}
