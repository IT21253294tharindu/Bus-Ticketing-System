import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bus } from '../../schemas/bus.schema';
import { TimeTable } from '../../schemas/time-table.schema';
import { CreateTimeTableDto } from './dto/create-time-table.dto';

@Injectable()
export class TimeTableService {
  constructor(
    @InjectModel(Bus.name) private busModel: Model<Bus>,
    @InjectModel(TimeTable.name) private timeTableModel: Model<TimeTable>,
  ) {}

  async createTimeTable(dto: CreateTimeTableDto) {
    const allShedules = 0;
    const routeNumber = '6526ddf1b8ad686a8813b614';
    const startTime = new Date();
    const endTime = new Date();

    startTime.setHours(9, 30, 0, 0);
    endTime.setHours(26, 30, 0, 0);

    const busses = await this.busModel.find({ route: routeNumber }).exec();

    const currentCity0List = busses.filter((e) => e.currentCity === 0);
    const currentCity1List = busses.filter((e) => e.currentCity === 1);

    const toColombo = [];
    const fromColombo = [];

    console.log(startTime);
    console.log(endTime);

    while (startTime.getTime() < endTime.getTime()) {
      for (const bus of currentCity0List) {
        toColombo.push({
          time: new Date(startTime),
          busNumber: bus.busNumber,
        });
        startTime.setMinutes(startTime.getMinutes() + 16);
        if (startTime.getTime() >= endTime.getTime()) break;
      }

      for (const bus of currentCity1List) {
        toColombo.push({
          time: new Date(startTime),
          busNumber: bus.busNumber,
        });
        startTime.setMinutes(startTime.getMinutes() + 16);
        if (startTime.getTime() >= endTime.getTime()) break;
      }
    }

    startTime.setHours(9, 30, 0, 0); // Set start time to 6:00 AM
    endTime.setHours(26, 30, 0, 0);

    while (startTime.getTime() < endTime.getTime()) {
      for (const bus of currentCity1List) {
        fromColombo.push({
          time: new Date(startTime),
          busNumber: bus.busNumber,
        });
        startTime.setMinutes(startTime.getMinutes() + 16);
        if (startTime.getTime() >= endTime.getTime()) break;
      }

      for (const bus of currentCity0List) {
        fromColombo.push({
          time: new Date(startTime),
          busNumber: bus.busNumber,
        });
        startTime.setMinutes(startTime.getMinutes() + 16);
        if (startTime.getTime() >= endTime.getTime()) break;
      }
    }

    dto.routeNo = routeNumber;
    dto.fromColombo = fromColombo;
    dto.toColombo = toColombo;

    const newTimeTable = new this.timeTableModel(dto);
    await newTimeTable.save();
    return newTimeTable;
  }

  async getTimeTables() {
    return await this.timeTableModel.find().populate('routeNo').exec();
  }

  async deleteTimeTable(timeTableId: String) {
    return await this.timeTableModel.findByIdAndDelete(timeTableId).exec();
  }
}
