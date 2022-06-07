import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoModule } from './photo';
import { TravelControllerV1 } from './travel.controller.v1';
import { Travel, TravelSchema } from './travel.schema';
import { TravelService } from './travel.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Travel.name, schema: TravelSchema }]),
    PhotoModule,
  ],
  controllers: [TravelControllerV1],
  providers: [TravelService],
})
export class TravelModule {}
