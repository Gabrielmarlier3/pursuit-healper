import { IsIn, IsLatitude, IsLongitude } from 'class-validator';

export class UpdateLocationDto {
  @IsIn(['A', 'B'])
  id: 'A' | 'B';

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
