import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BusShedule } from '../../schemas/bus-shedule.schema';
import { BusSheduleCreateDto } from './dto/create-shedule.dto';

@Injectable()
export class BusSheduleService {
  constructor(
    @InjectModel(BusShedule.name) private busSheduleModule: Model<BusShedule>,
  ) {}

  async create(dto: BusSheduleCreateDto) {
    try {
      const newShedule = new this.busSheduleModule(dto);
      await newShedule.save();
      return newShedule;
    } catch (e) {
      throw new ForbiddenException('Unble to create new shedule');
    }
  }

  //Get all shedules
  async getAllShedule() {
    try {
      return await this.busSheduleModule.find().populate('routeNo').exec();
    } catch (e) {
      throw new ForbiddenException('Unble to get shedules');
    }
  }

  //Delete shedule
  async deleteShedule(sheduleId: String) {
    try {
      return await this.busSheduleModule.findByIdAndDelete(sheduleId).exec();
    } catch (e) {
      throw new ForbiddenException('Unble to Delete');
    }
  }

  //update bus shedule
  async updateShedule(id: string, dto: BusSheduleCreateDto) {
    try {
      return await this.busSheduleModule.findByIdAndUpdate(id, dto);
    } catch (e) {
      throw new ForbiddenException('Unble to update bus');
    }
  }
}
