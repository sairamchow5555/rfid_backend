import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WareHouseService } from './warehouse.service';
import { WareHouseReq } from './dto/warehouse-req';
import { WareHouseResponseModel } from './dto/warehouse-response-model';
import { ApiTags } from '@nestjs/swagger';
import { WareHouseModel } from './dto/warehouse-model';
@ApiTags('warehouse')
@Controller('warehouse')
export class WareHouseController {
  constructor(private readonly wareHouseService: WareHouseService) {}

  // Create a new warehouse
  @Post('createWareHouse')
  create(@Body() dto: WareHouseModel): Promise<WareHouseResponseModel> {
    return this.wareHouseService.createWareHouse(dto);
  }

  // Get all active warehouses
  @Post('getAllActiveWareHouses')
  findAll(): Promise<WareHouseResponseModel> {
    return this.wareHouseService.getAllWareHouse();
  }

  // Update a warehouse by ID
  @Post('updateWareHouse/:id')
  update(
    @Param('id') id: string,
    @Body() dto: WareHouseModel,
  ): Promise<WareHouseResponseModel> {
    return this.wareHouseService.updateWareHouse(+id, dto);
  }

  // Delete a warehouse by ID (change status to InActive)
  @Delete('deleteWareHouse:id')
  remove(@Param('id') id: number): Promise<WareHouseResponseModel> {
    return this.wareHouseService.deleteWareHouse(+id);
  }
}
