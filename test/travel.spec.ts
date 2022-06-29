import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server-global';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '../src/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelModule } from '../src/travel';
import * as request from 'supertest';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuardMock } from './AuthGuard.mock';

const asgacolypse = {
  name: 'Asgacolypse',
  destination: 'Palace',
  board: 'all-inclusive',
  traveler: 10,
};

describe('Travel module', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          cache: true,
          validationSchema: validationSchema,
          validationOptions: {
            abortEarly: true,
          },
        }),
        MongooseModule.forRoot(mongoUri),
        TravelModule,
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: AuthGuardMock,
        },
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });

  it('T.1 should create new travel', () => {
    return request(app.getHttpServer())
      .post('/travel')
      .send(asgacolypse)
      .expect(HttpStatus.CREATED);
  });

  it('T.2 should get a list of all travels', async () => {
    const res = await request(app.getHttpServer())
      .get('/travel')
      .expect(HttpStatus.OK);

    const body = res.body;
    expect(body.length).toBe(1);
    expect(body[0]).toEqual(expect.objectContaining(asgacolypse));
  });
});
