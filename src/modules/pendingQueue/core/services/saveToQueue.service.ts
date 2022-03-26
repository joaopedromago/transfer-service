import { Injectable, Logger } from '@nestjs/common';
import { QueueRepositoryPort } from 'src/infrastructure/ports/';
import { Queue } from 'src/modules/pendingQueue/core/domain';

@Injectable()
export class SaveToQueueService {
  private readonly logger = new Logger(SaveToQueueService.name);

  constructor(private readonly queueRepository: QueueRepositoryPort) {}

  async save(transferId: string): Promise<void> {
    this.logger.verbose(
      `Adding transfer with id: ${transferId} to pending queue`,
    );

    await this.queueRepository.save(new Queue(transferId));
  }
}
