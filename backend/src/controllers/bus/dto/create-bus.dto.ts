import { IsNotEmpty, IsOptional } from 'class-validator';

export class BusCreateDto {
  @IsNotEmpty()
  busNumber: string;

  @IsNotEmpty()
  route: string;

  @IsOptional()
  currentCity: number;

  @IsOptional()
  contactNumber: string;

  @IsOptional()
  driverName: string;
}
