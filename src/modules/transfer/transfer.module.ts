import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QueueRepositoryProvider,
  TransferRepositoryProvider,
} from 'src/infrastructure/adapters/repository';
import { BankSettlementProvider } from 'src/infrastructure/adapters/bankSettlement';
import { Transfer, TransferSchema } from 'src/modules/transfer/core/domain';
import {
  CreateTransferService,
  ProcessTransferService,
} from 'src/modules/transfer/core/services';
import { TransferController } from 'src/modules/transfer/interfaces/rest';
import { Queue, QueueSchema } from 'src/modules/pendingQueue/core/domain';
import { SaveToQueueService } from 'src/modules/pendingQueue/core/services/';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transfer.name,
        schema: TransferSchema,
      },
      {
        name: Queue.name,
        schema: QueueSchema,
      },
    ]),
  ],
  controllers: [TransferController],
  providers: [
    TransferRepositoryProvider,
    QueueRepositoryProvider,
    ProcessTransferService,
    CreateTransferService,
    BankSettlementProvider,
    SaveToQueueService,
  ],
})
export class TransferModule {}
