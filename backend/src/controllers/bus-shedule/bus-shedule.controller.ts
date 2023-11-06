import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BusSheduleService } from './bus-shedule.service';
import { BusSheduleCreateDto } from './dto/create-shedule.dto';

@Controller('bus-shedule')
export class BusSheduleController {
  constructor(private busSheduleService: BusSheduleService) {}

  @HttpCode(200)
  @Post('create')
  create(@Body() dto: BusSheduleCreateDto) {
    return this.busSheduleService.create(dto);
  }

  @Get('all')
  getAllShedule() {
    return this.busSheduleService.getAllShedule();
  }

  @Delete('delete/:id')
  deleteShedule(@Param('id') id: string) {
    console.log(id);
    return this.busSheduleService.deleteShedule(id);
  }

  @Put('update/:id')
  updateBusShedule(@Param('id') id: string, @Body() dto: BusSheduleCreateDto) {
    return this.busSheduleService.updateShedule(id, dto);
  }
}
