import { Test, TestingModule } from '@nestjs/testing';
import { BusController } from './bus.controller';
import { BusService } from './bus.service';

describe('BusController', () => {
  let controller: BusController;

  const mockBusService = {
    create: jest.fn((dto) => {
      return {
        _id: expect.any(Number),
        ...dto,
      };
    }),
    updateBus: jest.fn((id, dto) => {
      return {
        _id: id,
        ...dto,
      };
    }),
    deleteBus: jest.fn((id) => {
      return {
        _id: id,
        busNumber: 'NB-7754',
        route: '774',
        currentCity: 0,
        contactNumber: '077541287',
        driverName: 'Naveen',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusController],
      providers: [BusService],
    })
      .overrideProvider(BusService)
      .useValue(mockBusService)
      .compile();

    controller = module.get<BusController>(BusController);
  });

  it('Test 1 passed - Bus controller Initialized ', () => {
    expect(controller).toBeDefined();
  });

  it('Test 2 passed - Bus Created', () => {
    const createDto = {
      busNumber: 'NB-7754',
      route: '774',
      currentCity: 0,
      contactNumber: '077541287',
      driverName: 'Naveen',
    };

    // Call the create function
    const createdBus = controller.create(createDto);

    // Assert that the create function was called with the correct input
    expect(mockBusService.create).toHaveBeenCalledWith(createDto);

    // Assert that the created bus matches the expected structure
    expect(createdBus).toEqual(
      expect.objectContaining({
        _id: expect.any(Number),
        busNumber: 'NB-7754',
        route: '774',
        currentCity: 0,
        contactNumber: '077541287',
        driverName: 'Naveen',
      }),
    );
  });

  it('Test 3 passed - Bus Updated', () => {
    const updateDto = {
      busNumber: 'NB-7754',
      route: '774',
      currentCity: 0,
      contactNumber: '077541287',
      driverName: 'Naveen',
    };

    const updatedBus = controller.updateBus('123', updateDto);
    expect(mockBusService.updateBus).toHaveBeenCalledWith('123', updateDto);

    // Assert that the created bus matches the expected structure
    expect(updatedBus).toEqual(
      expect.objectContaining({
        _id: '123',
        busNumber: 'NB-7754',
        route: '774',
        currentCity: 0,
        contactNumber: '077541287',
        driverName: 'Naveen',
      }),
    );
  });

  it('Test 4 passed - Bus Deleted', () => {
    const busId = '123';

    // Call the deleteBus function
    const deletedBus = controller.deleteBus(busId);

    // Assert that the delete function was called with the correct ID
    expect(mockBusService.deleteBus).toHaveBeenCalledWith(busId);

    // Assert that the deleted bus contains the expected structure
    expect(deletedBus).toEqual(
      expect.objectContaining({
        _id: '123', // Assuming your delete method returns the deleted bus ID
        busNumber: 'NB-7754',
        route: '774',
        currentCity: 0,
        contactNumber: '077541287',
        driverName: 'Naveen',
      }),
    );
  });
});
