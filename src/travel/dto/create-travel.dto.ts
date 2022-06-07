import { IsIn, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class CreateTravelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['breakfast', 'half-board', 'full-board', 'all-inclusive'])
  board: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(10)
  traveler: number;
}
