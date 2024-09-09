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
@ApiTags('warehouse')
@Controller('warehouse')
export class WareHouseController {
  constructor(private readonly wareHouseService: WareHouseService) {}

  // Create a new warehouse
  @Post()
  create(@Body() wareHouseDto: WareHouseReq): Promise<WareHouseResponseModel> {
    return this.wareHouseService.createWareHouse(wareHouseDto);
  }

  // Get all active warehouses
  @Get()
  findAll(): Promise<WareHouseResponseModel> {
    return this.wareHouseService.getAllWareHouse();
  }

  // Update a warehouse by ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() wareHouseDto: WareHouseReq,
  ): Promise<WareHouseResponseModel> {
    return this.wareHouseService.updateWareHouse(+id, wareHouseDto);
  }

  // Delete a warehouse by ID (change status to InActive)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<WareHouseResponseModel> {
    return this.wareHouseService.deleteWareHouse(+id);
  }
}
