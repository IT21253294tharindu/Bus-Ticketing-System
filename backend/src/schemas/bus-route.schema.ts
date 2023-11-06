import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BusRouteDocument = Document<BusRoute>;

@Schema()
export class BusRoute {
  @Prop()
  routeNo: string;

  @Prop()
  startCity: string;

  @Prop()
  endCity: string;

  @Prop()
  journyTime: number;

  @Prop()
  distance: number;
}

export const BusRouteSchema = SchemaFactory.createForClass(BusRoute);
