import { IsNotEmpty } from 'class-validator';

export class BusRouteCreateDto {
  @IsNotEmpty()
  startCity: string;

  @IsNotEmpty()
  routeNo: string;

  @IsNotEmpty()
  endCity: string;

  @IsNotEmpty()
  journyTime: number;

  @IsNotEmpty()
  distance: number;
}
