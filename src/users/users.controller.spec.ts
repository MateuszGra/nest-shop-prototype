import { Test, TestingModule } from '@nestjs/testing';
import { Userscontroller } from './userscontroller';

describe('UserController', () => {
  let controller: Userscontroller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Userscontroller],
    }).compile();

    controller = module.get<Userscontroller>(Userscontroller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
