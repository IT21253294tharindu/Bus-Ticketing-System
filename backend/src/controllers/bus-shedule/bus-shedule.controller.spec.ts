import { Test, TestingModule } from '@nestjs/testing';
import { BusSheduleController } from './bus-shedule.controller';
import { BusSheduleService } from './bus-shedule.service';

describe('BusSheduleController', () => {
  let controller: BusSheduleController;

  const mockBusSheduleService = {
    create: jest.fn((dto) => {
      return {
        _id: expect.any(Number),
        ...dto,
      };
    }),
    updateShedule: jest.fn((id, dto) => {
      return {
        _id: id,
        ...dto,
      };
    }),
    deleteShedule: jest.fn((id) => {
      return {
        _id: id,
        routeNo: '456',
        busCount: 100,
        firstBusTime: '02:00',
        lastBusTime: '22:00',
        generalTimeGap: 20,
        peekHours: '15:00 , 18:00',
        peekTimeGap: 10,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusSheduleController],
      providers: [BusSheduleService],
    })
      .overrideProvider(BusSheduleService)
      .useValue(mockBusSheduleService)
      .compile();

    controller = module.get<BusSheduleController>(BusSheduleController);

    controller = module.get<BusSheduleController>(BusSheduleController);
  });

  it('Test 1 passed - Bus shedule controller Initialized ', () => {
    expect(controller).toBeDefined();
  });

  it('Test 2 passed - Bus Shedule Created', () => {
    const createDto = {
      routeNo: '456',
      busCount: 100,
      firstBusTime: '02:00',
      lastBusTime: '22:00',
      generalTimeGap: 20,
      peekHours: '15:00 , 18:00',
      peekTimeGap: 10,
    };

    // Call the create function
    const createdBus = controller.create(createDto);

    // Assert that the create function was called with the correct input
    expect(mockBusSheduleService.create).toHaveBeenCalledWith(createDto);

    // Assert that the created bus matches the expected structure
    expect(createdBus).toEqual(
      expect.objectContaining({
        _id: expect.any(Number),
        routeNo: '456',
        busCount: 100,
        firstBusTime: '02:00',
        lastBusTime: '22:00',
        generalTimeGap: 20,
        peekHours: '15:00 , 18:00',
        peekTimeGap: 10,
      }),
    );
  });

  it('Test 3 passed - Bus Shedule Updated', () => {
    const createDto = {
      routeNo: '456',
      busCount: 100,
      firstBusTime: '02:00',
      lastBusTime: '22:00',
      generalTimeGap: 20,
      peekHours: '15:00 , 18:00',
      peekTimeGap: 10,
    };

    // Call the create function
    const createdBus = controller.updateBusShedule('123', createDto);

    // Assert that the create function was called with the correct input
    expect(mockBusSheduleService.updateShedule).toHaveBeenCalledWith(
      '123',
      createDto,
    );

    // Assert that the created bus matches the expected structure
    expect(createdBus).toEqual(
      expect.objectContaining({
        _id: '123',
        routeNo: '456',
        busCount: 100,
        firstBusTime: '02:00',
        lastBusTime: '22:00',
        generalTimeGap: 20,
        peekHours: '15:00 , 18:00',
        peekTimeGap: 10,
      }),
    );
  });

  it('Test 4 passed - Bus Shedule Deleted', () => {
    const busSheduleId = '123';
    // Call the deleteBus function
    const deletedBus = controller.deleteShedule(busSheduleId);
    expect(mockBusSheduleService.deleteShedule).toHaveBeenCalledWith(
      busSheduleId,
    );

    expect(deletedBus).toEqual(
      expect.objectContaining({
        _id: '123', // Assuming your delete method returns the deleted bus ID
        routeNo: '456',
        busCount: 100,
        firstBusTime: '02:00',
        lastBusTime: '22:00',
        generalTimeGap: 20,
        peekHours: '15:00 , 18:00',
        peekTimeGap: 10,
      }),
    );
  });
});
