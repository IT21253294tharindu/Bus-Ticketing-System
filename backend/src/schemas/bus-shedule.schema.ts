import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BusSheduleDocument = Document<BusShedule>;

@Schema()
export class BusShedule {
  @Prop({ type: Types.ObjectId, ref: 'BusRoute' })
  routeNo: string;

  @Prop()
  busCount: string;

  @Prop()
  firstBusTime: string;

  @Prop()
  lastBusTime: string;

  @Prop()
  generalTimeGap: number;

  @Prop({ type: [{ type: Object }] })
  peekHours: string[];

  @Prop()
  peekTimeGap: number;
}

export const BusSheduleSchema = SchemaFactory.createForClass(BusShedule);
