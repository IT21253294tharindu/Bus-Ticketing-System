import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { BusRouteService } from './bus-route.service';
import { BusRouteCreateDto } from './dto/bus-route-create.dto';

@Controller('bus-route')
export class BusRouteController {
  constructor(private busRouteService: BusRouteService) {}

  @HttpCode(200)
  @Post('create')
  create(@Body() dto: BusRouteCreateDto) {
    return this.busRouteService.create(dto);
  }

  @Get('all')
  getAll() {
    return this.busRouteService.findAll();
  }

  @Delete('delete/:id')
  removeRoute(@Param() id: string) {
    return this.busRouteService.removeBusRoute(id);
  }

  @Put('update/:id')
  updateBus(@Param('id') id: string, @Body() dto: BusRouteCreateDto) {
    return this.busRouteService.updateRoute(id, dto);
  }
}
