import { TransferRepositoryPort } from 'src/infrastructure/ports/';
import { Transfer, TransferDocument } from 'src/modules/transfer/core/domain';
import { transferDocumentMock } from 'test/mocks/entities';

export class TransferRepositoryMock implements TransferRepositoryPort {
  async save(transfer: Transfer): Promise<TransferDocument> {
    transfer;
    return transferDocumentMock;
  }

  async update(transfer: TransferDocument): Promise<void> {
    transfer;
  }

  async findById(id: string): Promise<TransferDocument> {
    id;
    return transferDocumentMock;
  }
}
