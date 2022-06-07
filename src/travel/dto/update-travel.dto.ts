import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTravelDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsIn(['breakfast', 'half-board', 'full-board', 'all-inclusive'])
  board?: string;
}
