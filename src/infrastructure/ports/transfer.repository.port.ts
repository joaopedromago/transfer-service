import { Transfer, TransferDocument } from 'src/modules/transfer/core/domain';

export abstract class TransferRepositoryPort {
  save: (transfer: Transfer) => Promise<void>;

  update: (transfer: TransferDocument) => Promise<void>;

  findById: (id: string) => Promise<TransferDocument>;
}
