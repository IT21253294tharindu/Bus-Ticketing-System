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
import { BusService } from './bus.service';
import { BusCreateDto } from './dto/create-bus.dto';

@Controller('bus')
export class BusController {
  constructor(private busService: BusService) {}

  //Create new bus
  @HttpCode(200)
  @Post('create')
  create(@Body() dto: BusCreateDto) {
    return this.busService.create(dto);
  }

  //Find busses for a particulaer route
  @Get('all-for-route')
  findBusForRoute(routId: string) {
    const routeId = '6525876c84b7222330fdeacd';
    return this.busService.findBusForRoute(routeId);
  }

  //Find all busses
  @Get('all')
  findAllBuses() {
    return this.busService.findAllBusses();
  }

  //Delete bus
  @Delete('delete/:id')
  deleteBus(@Param() id: string) {
    return this.busService.deleteBus(id);
  }

  @Put('update/:id')
  updateBus(@Param('id') id: string, @Body() dto: BusCreateDto) {
    return this.busService.updateBus(id, dto);
  }
}
