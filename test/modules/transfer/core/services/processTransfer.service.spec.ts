import { Test, TestingModule } from '@nestjs/testing';
import { BankSettlementProvider } from 'src/infrastructure/adapters/bankSettlement';
import {
  QueueRepositoryPort,
  TransferRepositoryPort,
} from 'src/infrastructure/ports';
import { SaveToQueueService } from 'src/modules/pendingQueue/core/services';
import { ProcessTransferService } from 'src/modules/transfer/core/services';
import { expectedDateCreationError } from 'src/modules/transfer/interfaces/responses';
import {
  oldDateTransferDocumentMock,
  transferDocumentMock,
  transferMock,
} from 'test/mocks/entities';
import {
  QueueRepositoryMock,
  TransferRepositoryMock,
} from 'test/mocks/repositories';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe(ProcessTransferService.name, () => {
  let service: ProcessTransferService;
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
        ProcessTransferService,
        BankSettlementProvider,
        SaveToQueueService,
      ],
    }).compile();

    service = module.get<ProcessTransferService>(ProcessTransferService);
    transferRepository = module.get<TransferRepositoryMock>(
      TransferRepositoryPort,
    );

    Date.now = jest.fn(() => 1648344763989);
    transferRepository.update = jest.fn();
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
      status: 'CREATED',
    });

    await service.process(transferDocumentMock);

    expect(transferRepository.update).toHaveBeenCalledWith(transferMock);
  });

  it('should throw out of date exception', async () => {
    try {
      await service.process(oldDateTransferDocumentMock);
    } catch (error) {
      expect(error.message).toBe(expectedDateCreationError.description);
    }
  });
});
