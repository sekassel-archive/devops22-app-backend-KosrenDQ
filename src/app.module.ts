import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { validationSchema } from './config';
import { TravelModule } from './travel';
import * as toJson from '@meanie/mongoose-to-json';

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
    KeycloakConnectModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        authServerUrl: configService.get<string>('KEYCLOAK_URI'),
        realm: configService.get<string>('KEYCLOAK_REALM'),
        clientId: configService.get<string>('KEYCLOAK_CLIENT_ID'),
        secret: configService.get<string>('KEYCLOAK_SECRET'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        connectionFactory: (connection: Connection) => {
          return connection.plugin(toJson);
        },
      }),
      inject: [ConfigService],
    }),
    TravelModule,
  ],
})
export class AppModule {}
