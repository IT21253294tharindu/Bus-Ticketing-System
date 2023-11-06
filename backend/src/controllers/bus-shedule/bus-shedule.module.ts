import { Module } from '@nestjs/common';
import { BusSheduleController } from './bus-shedule.controller';
import { BusSheduleService } from './bus-shedule.service';
import { BusShedule, BusSheduleSchema } from 'src/schemas/bus-shedule.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusShedule.name, schema: BusSheduleSchema },
      ,
    ]),
  ],
  controllers: [BusSheduleController],
  providers: [BusSheduleService],
})
export class BusSheduleModule {}
