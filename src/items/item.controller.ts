import { Controller, Post, Body, Get, Param, Delete, Put } from "@nestjs/common";
import { ItemService } from "./item.service";
import { ItemModel } from "./dto/item-model";
import { ItemReq } from "./dto/item-req";
import { ItemIdReq } from "./dto/item-id.req";
import { ItemReponseModel } from "./dto/item-response-model";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('items')
@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post('create')
    async createItem(@Body() dto: ItemModel): Promise<ItemReponseModel> {
        return await this.itemService.createItem(dto);
    }

    @Put('update/:id')
    async updateItem(@Param('id') id: number, @Body() dto: ItemModel): Promise<ItemReponseModel> {
        return await this.itemService.updateItem(id, dto);
    }

    @Get('all-active')
    async getAllItems(): Promise<ItemReponseModel> {
        return await this.itemService.getAllItems();
    }

    @Delete('delete')
    async deleteItem(@Body() req: ItemIdReq): Promise<ItemReponseModel> {
        return await this.itemService.deleteItem(req);
    }
}
