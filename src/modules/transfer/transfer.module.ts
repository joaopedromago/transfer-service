import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransferRepositoryProvider } from 'src/infrastructure/adapters/repository';
import { BankSettlementProvider } from 'src/infrastructure/adapters/bankSettlement';
import { Transfer, TransferSchema } from 'src/modules/transfer/core/domain';
import {
  CreateTransferService,
  ProcessTransferService,
} from 'src/modules/transfer/core/services';
import { TransferController } from 'src/modules/transfer/interfaces/rest';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transfer.name,
        schema: TransferSchema,
      },
    ]),
  ],
  controllers: [TransferController],
  providers: [
    TransferRepositoryProvider,
    ProcessTransferService,
    CreateTransferService,
    BankSettlementProvider,
  ],
})
export class TransferModule {}
