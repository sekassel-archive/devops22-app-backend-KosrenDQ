import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import { PhotoControllerV1 } from './photo.controller.v1';
import { PhotoService } from './photo.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        storage: new GridFsStorage({
          url: configService.get<string>('MONGO_URI'),
          file: (req, file: Express.Multer.File) => {
            return new Promise((resolve, reject) => {
              let fileInfo = {};
              try {
                fileInfo = {
                  filename: file.originalname.trim(),
                  metadata: {
                    travelId: req.params.id,
                  },
                };
              } catch (error) {
                reject(error);
              }
              resolve(fileInfo);
            });
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PhotoControllerV1],
  providers: [PhotoService],
})
export class PhotoModule {}
