import { Test, TestingModule } from '@nestjs/testing';
import { BankSettlementProvider } from 'src/infrastructure/adapters/bankSettlement';
import {
  QueueRepositoryPort,
  TransferRepositoryPort,
} from 'src/infrastructure/ports';
import { SaveToQueueService } from 'src/modules/pendingQueue/core/services';
import { ProcessTransferService } from 'src/modules/transfer/core/services';
import {
  expectedDateCreationError,
  rejectedTransfer,
} from 'src/modules/transfer/interfaces/responses';
import {
  oldDateTransferDocumentMock,
  transferDocumentMock,
} from 'test/mocks/entities';
import {
  QueueRepositoryMock,
  TransferRepositoryMock,
} from 'test/mocks/repositories';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { TransferStatus } from 'src/shared/enums';

const mock = new MockAdapter(axios);

describe(ProcessTransferService.name, () => {
  let service: ProcessTransferService;
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
      ],
    }).compile();

    service = module.get<ProcessTransferService>(ProcessTransferService);
    transferRepository = module.get<TransferRepositoryMock>(
      TransferRepositoryPort,
    );
    queueRepository = module.get<QueueRepositoryMock>(QueueRepositoryPort);

    transferRepository.update = jest.fn();
    queueRepository.save = jest.fn();

    Date.now = jest.fn(() => 1648344763989);
  });

  afterEach(() => {
    process.env = {};
    jest.clearAllMocks();
    mock.resetHistory();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process transfer', async () => {
    mock.onPost('/paymentOrders').reply(200, {
      internalId: 'mocked123',
      status: TransferStatus.CREATED,
    });

    const result = await service.process(transferDocumentMock);

    expect(transferRepository.update).toHaveBeenCalledWith(
      transferDocumentMock,
    );
    expect(result).toBe(transferDocumentMock);
  });

  it('should process transfer with reject result', async () => {
    mock.onPost('/paymentOrders').reply(200, {
      internalId: 'mocked123',
      status: TransferStatus.REJECTED,
    });

    try {
      await service.process(transferDocumentMock);
    } catch (error) {
      expect(error.message).toBe(rejectedTransfer.description);
    }

    expect(transferRepository.update).toHaveBeenCalledWith(
      transferDocumentMock,
    );
  });

  it('should get an error processing transfer and add it to dead letter queue', async () => {
    mock.onPost('/paymentOrders').reply(400, {});

    await service.process(transferDocumentMock);

    expect(queueRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw out of date exception', async () => {
    try {
      await service.process(oldDateTransferDocumentMock);
    } catch (error) {
      expect(error.message).toBe(expectedDateCreationError.description);
    }
  });
});
