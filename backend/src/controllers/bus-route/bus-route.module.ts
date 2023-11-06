import { Module } from '@nestjs/common';
import { BusRouteController } from './bus-route.controller';
import { BusRouteService } from './bus-route.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BusRoute, BusRouteSchema } from 'src/schemas/bus-route.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BusRoute.name, schema: BusRouteSchema },
    ]),
  ],
  controllers: [BusRouteController],
  providers: [BusRouteService],
})
export class BusRouteModule {}
