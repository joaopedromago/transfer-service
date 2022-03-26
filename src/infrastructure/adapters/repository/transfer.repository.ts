import { Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransferRepositoryPort } from 'src/infrastructure/ports/';
import { Transfer, TransferDocument } from 'src/modules/transfer/core/domain';

export class TransferRepositoryAdapter implements TransferRepositoryPort {
  constructor(
    @InjectModel(Transfer.name)
    private readonly transferModel: Model<TransferDocument>,
  ) {}

  async save(transfer: Transfer): Promise<TransferDocument> {
    return this.transferModel.create(transfer);
  }

  async update(transfer: TransferDocument): Promise<void> {
    transfer.isNew = false;
    await transfer.save();
  }

  async findById(id: string): Promise<TransferDocument> {
    return this.transferModel
      .findOne({
        _id: id,
      })
      .exec();
  }
}

export const TransferRepositoryProvider: Provider<TransferRepositoryPort> = {
  provide: TransferRepositoryPort,
  useClass: TransferRepositoryAdapter,
};
