import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    increseAccountBalance: jest.fn(async (userId, amount) => {
      return {
        updated: true,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('Test 1 passed - User controller Initialized', () => {
    expect(controller).toBeDefined();
  });

  it('Test 2 passed - User Account Top up', async () => {
    const userData = {
      userId: '123',
      amount: 1000,
    };

    const req = {
      user: {
        id: '123',
      },
    };

    // Call the updateAccountBalance function with userData
    const updateAccountBalance = await controller.updateAccountBalance(
      req,
      userData,
    );

    // Assert that mockUserService.increseAccountBalance was called with the correct arguments
    expect(mockUserService.increseAccountBalance).toHaveBeenCalledWith(
      userData.userId,
      userData.amount,
    );

    // Assert the response as expected
    expect(updateAccountBalance).toEqual(
      expect.objectContaining({
        updated: true,
      }),
    );
  });
});
