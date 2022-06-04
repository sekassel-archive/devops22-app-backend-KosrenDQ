import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppControllerV1 } from './app.controller.v1';
import { AppService } from './app.service';
import { validationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: validationSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
  controllers: [AppControllerV1],
  providers: [AppService],
})
export class AppModule {}
