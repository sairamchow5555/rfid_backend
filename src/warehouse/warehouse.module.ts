import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WareHouseService } from './warehouse.service';
import { WareHouseController } from './warehouse.controller';
import { WareHouseEntity } from './entities/warehouse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WareHouseEntity])],
  controllers: [WareHouseController],
  providers: [WareHouseService],
})
export class WareHouseModule {}
