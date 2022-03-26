import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  QueueRepositoryProvider,
  TransferRepositoryProvider,
} from 'src/infrastructure/adapters/repository';
import { BankSettlementProvider } from 'src/infrastructure/adapters/bankSettlement';
import { Transfer, TransferSchema } from 'src/modules/transfer/core/domain';
import { ProcessTransferService } from 'src/modules/transfer/core/services';
import { PendingQueueService } from 'src/modules/pendingQueue/core/services';
import { Queue, QueueSchema } from 'src/modules/pendingQueue/core/domain';

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
  providers: [
    TransferRepositoryProvider,
    QueueRepositoryProvider,
    ProcessTransferService,
    BankSettlementProvider,
    PendingQueueService,
  ],
})
export class TransferModule {}
