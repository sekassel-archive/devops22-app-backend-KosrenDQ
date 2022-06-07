import { IsMongoId } from 'class-validator';

export class FindTravelParams {
  @IsMongoId()
  id: string;
}
