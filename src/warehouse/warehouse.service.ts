import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WareHouseReq } from './dto/warehouse-req';
import { WareHouseResponseModel } from './dto/warehouse-response-model';
import { WareHouseStatusEnum } from './dto/warehouse-status-enum';
import { WareHouseEntity } from './entities/warehouse.entity';

@Injectable()
export class WareHouseService {
  constructor(
    @InjectRepository(WareHouseEntity)
    private readonly wareHouseRepository: Repository<WareHouseEntity>,
  ) {}

  // Create Ware House
  async createWareHouse(dto: WareHouseReq): Promise<WareHouseResponseModel> {
    try {
      const wareHouseObj = new WareHouseEntity();
      wareHouseObj.wareHouseName = dto.wareHouseName;

      const savedWareHouse = await this.wareHouseRepository.save(wareHouseObj);

      if (savedWareHouse) {
        return new WareHouseResponseModel(true, 1, 'WareHouse Created Successfully', [
          savedWareHouse,
        ]);
      } else {
        return new WareHouseResponseModel(false, 0, 'Failed to create ware house', []);
      }
    } catch (error) {
      throw new Error('Error occurred while creating ware house');
    }
  }

  // Get All Active Ware Houses
  async getAllWareHouse(): Promise<WareHouseResponseModel> {
    try {
      const wareHouses = await this.wareHouseRepository.find({
        where: { status: WareHouseStatusEnum.Active },
      });
      if (wareHouses.length === 0) {
        return new WareHouseResponseModel(false, 0, 'No Active Ware Houses found', []);
      }

      return new WareHouseResponseModel(true, 1, 'Active Ware Houses Retrieved', wareHouses);
    } catch (error) {
      throw new Error('Error occurred while retrieving ware houses');
    }
  }

  // Update Ware House
  async updateWareHouse(id: number, dto: WareHouseReq): Promise<WareHouseResponseModel> {
    try {
      const existingWareHouse = await this.wareHouseRepository.findOne({ where: { id } });

      if (!existingWareHouse) {
        return new WareHouseResponseModel(false, 0, 'Ware House not found', []);
      }

      existingWareHouse.wareHouseName = dto.wareHouseName;
      existingWareHouse.status = dto.status;

      const updatedWareHouse = await this.wareHouseRepository.save(existingWareHouse);
      return new WareHouseResponseModel(true, 1, 'Ware House Updated Successfully', [
        updatedWareHouse,
      ]);
    } catch (error) {
      throw new Error('Error occurred while updating Ware House');
    }
  }

  // Delete (Change status to 'InActive')
  async deleteWareHouse(id: number): Promise<WareHouseResponseModel> {
    try {
      const wareHouse = await this.wareHouseRepository.findOne({ where: { id } });

      if (!wareHouse) {
        return new WareHouseResponseModel(false, 0, 'Ware House not found', []);
      }

      wareHouse.status = WareHouseStatusEnum.InActive;
      const updatedWareHouse = await this.wareHouseRepository.save(wareHouse);

      return new WareHouseResponseModel(true, 1, 'WareHouse Deleted (Status set to InActive)', [
        updatedWareHouse,
      ]);
    } catch (error) {
      throw new Error('Error occurred while deleting Ware House');
    }
  }
}
