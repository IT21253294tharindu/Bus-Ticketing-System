import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BusRoute } from '../../schemas/bus-route.schema';
import { BusRouteCreateDto } from './dto/bus-route-create.dto';

@Injectable()
export class BusRouteService {
  constructor(
    @InjectModel(BusRoute.name) private busRouteModel: Model<BusRoute>,
  ) {}

  //Create new bus oute
  async create(dto: BusRouteCreateDto) {
    try {
      const newRoute = new this.busRouteModel(dto);
      await newRoute.save();
      return newRoute;
    } catch (e) {
      return new ForbiddenException('Unable to create bus');
    }
  }

  //find all busses
  async findAll() {
    try {
      return await this.busRouteModel.find().exec();
    } catch (e) {
      return new ForbiddenException('Unable to Find bus');
    }
  }

  //Update bus route
  async updateRoute(routeId: string, dto: BusRouteCreateDto) {
    try {
      const updatd = await this.busRouteModel.findByIdAndUpdate(routeId, dto);
      return updatd;
    } catch (e) {
      return new ForbiddenException('Unable to Update');
    }
  }

  //Remove bus route
  async removeBusRoute(routeId: string) {
    try {
      return await this.busRouteModel.findByIdAndDelete(routeId);
    } catch (e) {
      return new ForbiddenException('Unable to Delete');
    }
  }
}
