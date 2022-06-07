import { IsMongoId } from 'class-validator';

export class FindPhotoParams {
  @IsMongoId()
  id: string;

  @IsMongoId()
  pid: string;
}
