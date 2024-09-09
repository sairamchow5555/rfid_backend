import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemService } from './item.service';
import { ItemEntity } from './entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
    ]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
