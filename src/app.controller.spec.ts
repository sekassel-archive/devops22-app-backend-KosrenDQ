import { Test, TestingModule } from '@nestjs/testing';
import { AppControllerV1 } from './app.controller.v1';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppControllerV1;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppControllerV1],
      providers: [AppService],
    }).compile();

    appController = app.get<AppControllerV1>(AppControllerV1);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!!!!111!!!');
    });
  });
});
