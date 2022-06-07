import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindPhotoParams, FindTravelParams } from '../dto';
import { PhotoService } from './photo.service';
import { GridFSFile } from 'mongodb';
import { Response } from 'express';

@Controller({
  version: '1',
  path: 'travel/:id/photo',
})
export class PhotoControllerV1 {
  constructor(private photoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async uploadPhoto(
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<Express.Multer.File> {
    return photo;
  }

  @Get()
  async getPhotoListFromTravel(
    @Param() params: FindTravelParams,
  ): Promise<GridFSFile[]> {
    return this.photoService.findPhotosFromTravel(params.id);
  }

  @Get(':pid')
  async getPhoto(@Param() params: FindPhotoParams, @Res() res: Response) {
    const file = await this.photoService.findPhoto(params.id, params.pid);
    return file.pipe(res);
  }

  @Delete(':pid')
  async deletePhoto(@Param() params: FindPhotoParams): Promise<GridFSFile> {
    return this.photoService.deletePhoto(params.id, params.pid);
  }
}
