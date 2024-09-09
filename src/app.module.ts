import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './config';
import { ItemModule } from './items/item.module';
import { TagModule } from './tag/tag.module';
import { ItemEntity } from './items/entities/item.entity';
import { TagEntity } from './tag/entities/tag.entity';
import { WareHouseEntity } from './warehouse/entities/warehouse.entity';
import { WareHouseModule } from './warehouse/warehouse.module';

const config = new Config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.host,
      port: 3306,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [ItemEntity, TagEntity, WareHouseEntity],
      synchronize: true,
    }),
    ItemModule,
    TagModule,
    WareHouseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
