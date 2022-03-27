import { QueueRepositoryPort } from 'src/infrastructure/ports/';
import { Queue, QueueDocument } from 'src/modules/pendingQueue/core/domain';
import { queueDocumentMock } from 'test/mocks/entities';

export class QueueRepositoryMock implements QueueRepositoryPort {
  async save(queue: Queue): Promise<QueueDocument> {
    queue;
    return queueDocumentMock;
  }

  async update(queue: QueueDocument): Promise<void> {
    queue;
  }

  async getPending(): Promise<QueueDocument[]> {
    return [queueDocumentMock];
  }
}
