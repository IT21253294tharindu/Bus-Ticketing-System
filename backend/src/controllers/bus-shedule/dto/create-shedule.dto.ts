import { IsNotEmpty, IsOptional } from 'class-validator';

export class BusSheduleCreateDto {
  @IsNotEmpty()
  routeNo: string;

  @IsOptional()
  busCount: number;

  @IsOptional()
  firstBusTime: string;

  @IsOptional()
  lastBusTime: string;

  @IsOptional()
  generalTimeGap: number;

  @IsOptional()
  peekHours: any;

  @IsOptional()
  peekTimeGap: number;
}
