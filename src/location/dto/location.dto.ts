import { IsLatitude, IsLongitude, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  id: string;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
