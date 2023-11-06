import { Module } from '@nestjs/common';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bus, BusSchema } from 'src/schemas/bus.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bus.name, schema: BusSchema }])],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
