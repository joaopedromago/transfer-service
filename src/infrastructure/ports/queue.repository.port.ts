import { Queue, QueueDocument } from 'src/modules/pendingQueue/core/domain';

export abstract class QueueRepositoryPort {
  save: (queue: Queue) => Promise<QueueDocument>;

  update: (queue: QueueDocument) => Promise<void>;

  getPending: () => Promise<QueueDocument[]>;
}
