import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { env } from 'src/infrastructure/config';
import {
  QueueRepositoryPort,
  TransferRepositoryPort,
} from 'src/infrastructure/ports';
import { ProcessTransferService } from 'src/modules/transfer/core/services/processTransfer.service';
import { to } from 'src/shared/utils';

@Injectable()
export class PendingQueueService {
  private readonly logger = new Logger(PendingQueueService.name);

  constructor(
    private readonly transferRepository: TransferRepositoryPort,
    private readonly queueRepository: QueueRepositoryPort,
    private readonly processTransferService: ProcessTransferService,
  ) {}

  @Cron(env.EXECUTE_PENDING_QUEUE_CRON || CronExpression.EVERY_HOUR)
  async processPendingTransfers(): Promise<void> {
    this.logger.verbose('Starting processing pending transfers');

    const pendingTransfers = await this.queueRepository.getPending();

    await Promise.all(
      pendingTransfers.map(async (queuedTransfer) => {
        queuedTransfer.setExecuted();
        await this.queueRepository.update(queuedTransfer);

        const transfer = await this.transferRepository.findById(
          queuedTransfer.transferId,
        );

        const [error, response] = await to(
          this.processTransferService.process(transfer),
        );

        if (error) {
          this.logger.error(error);
        } else {
          this.logger.verbose(response);
        }
      }),
    );
  }
}
