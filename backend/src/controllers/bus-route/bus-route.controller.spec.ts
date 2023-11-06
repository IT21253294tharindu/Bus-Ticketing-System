import { Test, TestingModule } from '@nestjs/testing';
import { BusRouteController } from './bus-route.controller';
import { BusRouteService } from './bus-route.service';

describe('BusRouteController', () => {
  let controller: BusRouteController;

  const mockBusRouteService = {
    create: jest.fn((dto) => {
      return {
        _id: expect.any(Number),
        ...dto,
      };
    }),

    updateRoute: jest.fn((id, dto) => {
      return {
        _id: id,
        ...dto,
      };
    }),

    removeBusRoute: jest.fn((id) => {
      return {
        _id: id,
        startCity: 'Colombo',
        routeNo: '774',
        endCity: 'Jaffna',
        journyTime: 120,
        distance: 10,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusRouteController],
      providers: [BusRouteService],
    })
      .overrideProvider(BusRouteService)
      .useValue(mockBusRouteService)
      .compile();

    controller = module.get<BusRouteController>(BusRouteController);
  });

  it('Test 1 passed - BusRoute controller Initialized', () => {
    expect(controller).toBeDefined();
  });

  it('Test 2 passed - Bus Route', () => {
    const createDto = {
      startCity: 'Colombo',
      routeNo: '774',
      endCity: 'Jaffna',
      journyTime: 120,
      distance: 10,
    };

    // Call the create function
    const createdBusRoute = controller.create(createDto);

    // Assert that the create function was called with the correct input
    expect(mockBusRouteService.create).toHaveBeenCalledWith(createDto);

    // Assert that the created bus matches the expected structure
    expect(createdBusRoute).toEqual(
      expect.objectContaining({
        _id: expect.any(Number),
        startCity: 'Colombo',
        routeNo: '774',
        endCity: 'Jaffna',
        journyTime: 120,
        distance: 10,
      }),
    );
  });

  it('Test 3 passed - Bus Route Updated', () => {
    const updateDto = {
      startCity: 'Colombo',
      routeNo: '774',
      endCity: 'Jaffna',
      journyTime: 120,
      distance: 10,
    };

    const updatedBusRoute = controller.updateBus('123', updateDto);
    expect(mockBusRouteService.updateRoute).toHaveBeenCalledWith(
      '123',
      updateDto,
    );

    // Assert that the created bus matches the expected structure
    expect(updatedBusRoute).toEqual(
      expect.objectContaining({
        _id: '123',
        startCity: 'Colombo',
        routeNo: '774',
        endCity: 'Jaffna',
        journyTime: 120,
        distance: 10,
      }),
    );
  });

  it('Test 4 passed - Bus Route Deleted', () => {
    const busRouteId = '123';

    // Call the deleteBus function
    const deletedBusRoute = controller.removeRoute(busRouteId);

    // Assert that the delete function was called with the correct ID
    expect(mockBusRouteService.removeBusRoute).toHaveBeenCalledWith(busRouteId);

    // Assert that the deleted bus contains the expected structure
    expect(deletedBusRoute).toEqual(
      expect.objectContaining({
        _id: '123', // Assuming your delete method returns the deleted bus ID
        startCity: 'Colombo',
        routeNo: '774',
        endCity: 'Jaffna',
        journyTime: 120,
        distance: 10,
      }),
    );
  });
});
