import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BusDocument = Document<Bus>;

@Schema()
export class Bus {
  @Prop()
  busNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'BusRoute' })
  route: string;

  @Prop()
  currentCity: number;

  @Prop()
  contactNumber: string;

  @Prop()
  driverName: string;
}

export const BusSchema = SchemaFactory.createForClass(Bus);
