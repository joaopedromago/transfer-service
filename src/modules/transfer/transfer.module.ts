import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransferRepositoryProvider } from 'src/infrastructure/adapters/repository';
import { Transfer, TransferSchema } from 'src/modules/transfer/core/domain';
import { CreateTransferService } from 'src/modules/transfer/core/services';
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
  providers: [TransferRepositoryProvider, CreateTransferService],
})
export class TransferModule {}
