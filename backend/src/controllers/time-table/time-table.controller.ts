import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { TimeTableService } from './time-table.service';
import { CreateTimeTableDto } from './dto/create-time-table.dto';

@Controller('time-table')
export class TimeTableController {
  constructor(private timeTableService: TimeTableService) {}

  @Post('create')
  create(@Body() dto: CreateTimeTableDto) {
    return this.timeTableService.createTimeTable(dto);
  }

  @Get('all')
  getTimeTables() {
    return this.timeTableService.getTimeTables();
  }

  @Delete('delete')
  deleteTimeTable(timeTableId: String) {
    return this.timeTableService.deleteTimeTable(timeTableId);
  }
}
