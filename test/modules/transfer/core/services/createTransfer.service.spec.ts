import { Test, TestingModule } from '@nestjs/testing';
import { BankSettlementProvider } from 'src/infrastructure/adapters/bankSettlement';
import {
  QueueRepositoryPort,
  TransferRepositoryPort,
} from 'src/infrastructure/ports';
import { SaveToQueueService } from 'src/modules/pendingQueue/core/services';
import {
  CreateTransferService,
  ProcessTransferService,
} from 'src/modules/transfer/core/services';
import { transferDtoMock, transferMock } from 'test/mocks/entities';
import {
  QueueRepositoryMock,
  TransferRepositoryMock,
} from 'test/mocks/repositories';

describe(CreateTransferService.name, () => {
  let service: CreateTransferService;
  let processTransferService: ProcessTransferService;
  let transferRepository: TransferRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TransferRepositoryPort,
          useClass: TransferRepositoryMock,
        },
        {
          provide: QueueRepositoryPort,
          useClass: QueueRepositoryMock,
        },
        CreateTransferService,
        ProcessTransferService,
        BankSettlementProvider,
        SaveToQueueService,
      ],
    }).compile();

    service = module.get<CreateTransferService>(CreateTransferService);
    processTransferService = module.get<ProcessTransferService>(
      ProcessTransferService,
    );
    transferRepository = module.get<TransferRepositoryMock>(
      TransferRepositoryPort,
    );

    processTransferService.process = jest.fn();
    transferRepository.save = jest.fn();
  });

  afterEach(() => {
    process.env = {};
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a transfer and start processing', async () => {
    await service.create(transferDtoMock);

    expect(transferRepository.save).toHaveBeenCalledWith(transferMock);
    expect(processTransferService.process).toHaveBeenCalledTimes(1);
  });
});
