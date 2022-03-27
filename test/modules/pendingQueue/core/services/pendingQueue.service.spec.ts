import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BankSettlementProvider } from 'src/infrastructure/adapters/bankSettlement';
import {
  QueueRepositoryPort,
  TransferRepositoryPort,
} from 'src/infrastructure/ports';
import {
  PendingQueueService,
  SaveToQueueService,
} from 'src/modules/pendingQueue/core/services';
import { ProcessTransferService } from 'src/modules/transfer/core/services';
import { transferMock } from 'test/mocks/entities';
import {
  QueueRepositoryMock,
  TransferRepositoryMock,
} from 'test/mocks/repositories';

describe(PendingQueueService.name, () => {
  let service: PendingQueueService;
  let processTransferService: ProcessTransferService;
  let transferRepository: TransferRepositoryMock;
  let queueRepository: QueueRepositoryMock;

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
        ProcessTransferService,
        BankSettlementProvider,
        SaveToQueueService,
        PendingQueueService,
      ],
    }).compile();

    service = module.get<PendingQueueService>(PendingQueueService);
    transferRepository = module.get<TransferRepositoryMock>(
      TransferRepositoryPort,
    );
    queueRepository = module.get<QueueRepositoryMock>(QueueRepositoryPort);
    processTransferService = module.get<ProcessTransferService>(
      ProcessTransferService,
    );

    transferRepository.update = jest.fn();
    queueRepository.save = jest.fn();

    Date.now = jest.fn(() => 1648344763989);
  });

  afterEach(() => {
    process.env = {};
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process transfer', async () => {
    processTransferService.process = jest.fn(() =>
      Promise.resolve(transferMock),
    );

    await service.processPendingTransfers();

    expect(processTransferService.process).toHaveBeenCalledTimes(1);
  });

  it('should process transfer with error', async () => {
    processTransferService.process = jest.fn().mockImplementation(async () => {
      await Promise.resolve(() => {
        throw new HttpException('', 400);
      });
    });

    await service.processPendingTransfers();

    expect(processTransferService.process).toHaveBeenCalledTimes(1);
  });
});
