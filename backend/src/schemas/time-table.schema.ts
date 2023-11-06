import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TimeTableDocument = Document<TimeTable>;

@Schema()
export class TimeTable {
  @Prop({ type: Types.ObjectId, ref: 'BusRoute' })
  routeNo: any;

  @Prop({ type: [{ type: Object }] })
  fromColombo: Record<any, any>[];

  @Prop({ type: [{ type: Object }] })
  toColombo: Record<any, any>[];
}

export const TimeTableSchema = SchemaFactory.createForClass(TimeTable);
