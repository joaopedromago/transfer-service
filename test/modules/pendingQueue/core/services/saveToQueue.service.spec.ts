import { Test, TestingModule } from '@nestjs/testing';
import { QueueRepositoryPort } from 'src/infrastructure/ports';
import { SaveToQueueService } from 'src/modules/pendingQueue/core/services';
import { queueMock } from 'test/mocks/entities';
import { QueueRepositoryMock } from 'test/mocks/repositories';

describe(SaveToQueueService.name, () => {
  let service: SaveToQueueService;
  let queueRepository: QueueRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: QueueRepositoryPort,
          useClass: QueueRepositoryMock,
        },
        SaveToQueueService,
      ],
    }).compile();

    service = module.get<SaveToQueueService>(SaveToQueueService);
    queueRepository = module.get<QueueRepositoryMock>(QueueRepositoryPort);

    queueRepository.save = jest.fn();
  });

  afterEach(() => {
    process.env = {};
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a queue', async () => {
    await service.save(queueMock.transferId);

    expect(queueRepository.save).toHaveBeenCalledWith(queueMock);
  });
});
