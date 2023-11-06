import { Module } from '@nestjs/common';
import { TimeTableController } from './time-table.controller';
import { TimeTableService } from './time-table.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bus, BusSchema } from 'src/schemas/bus.schema';
import { TimeTable, TimeTableSchema } from 'src/schemas/time-table.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bus.name, schema: BusSchema },
      { name: TimeTable.name, schema: TimeTableSchema },
    ]),
  ],
  controllers: [TimeTableController],
  providers: [TimeTableService],
})
export class TimeTableModule {}
