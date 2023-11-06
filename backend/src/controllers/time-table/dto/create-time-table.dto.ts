import { IsNotEmpty } from 'class-validator';

export class CreateTimeTableDto {
  @IsNotEmpty()
  routeNo: string;

  @IsNotEmpty()
  fromColombo: any;

  @IsNotEmpty()
  toColombo: any;
}
