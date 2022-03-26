import { Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueueRepositoryPort } from 'src/infrastructure/ports/';
import { Queue, QueueDocument } from 'src/modules/pendingQueue/core/domain';

export class QueueRepositoryAdapter implements QueueRepositoryPort {
  constructor(
    @InjectModel(Queue.name)
    private readonly queueModel: Model<QueueDocument>,
  ) {}

  async save(queue: Queue): Promise<QueueDocument> {
    return this.queueModel.create(queue);
  }

  async update(queue: QueueDocument): Promise<void> {
    queue.isNew = false;
    await queue.save();
  }

  async getPending(): Promise<QueueDocument[]> {
    return this.queueModel
      .find({
        isPending: true,
      })
      .exec();
  }
}

export const QueueRepositoryProvider: Provider<QueueRepositoryPort> = {
  provide: QueueRepositoryPort,
  useClass: QueueRepositoryAdapter,
};
