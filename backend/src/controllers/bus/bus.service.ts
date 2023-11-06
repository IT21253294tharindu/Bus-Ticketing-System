import { ForbiddenException, Injectable } from '@nestjs/common';
import { BusCreateDto } from './dto/create-bus.dto';
import { Bus } from '../../schemas/bus.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BusService {
  constructor(@InjectModel(Bus.name) private busModel: Model<Bus>) {}

  //Create new bus
  async create(dto: BusCreateDto) {
    const newBus = new this.busModel(dto);
    await newBus.save();
    return newBus;
  }

  //Get all busses for route
  async findBusForRoute(routeId: String) {
    try {
      const busses = await this.busModel.find({ route: routeId }).exec();
      console.log(busses.length);
      return busses;
    } catch (e) {
      return new ForbiddenException('Unable to Find busses');
    }
  }

  //Get all bussess
  async findAllBusses() {
    try {
      return await this.busModel.find().populate('route').exec();
    } catch (e) {
      return new ForbiddenException('Unable to Find busses');
    }
  }

  //Delete busses
  async deleteBus(busId: String) {
    try {
      return await this.busModel.findByIdAndUpdate(busId);
    } catch (e) {
      return new ForbiddenException('Unable to Find busses');
    }
  }

  //update busses
  async updateBus(busId: String, dto: BusCreateDto) {
    try {
      return await this.busModel.findByIdAndUpdate(busId, dto);
    } catch (e) {
      return new ForbiddenException('Unable to update the bus');
    }
  }
}
