import { Injectable, Logger } from '@nestjs/common';
// import { TransferRepositoryPort } from 'src/infrastructure/ports';
// import { Transfer } from 'src/modules/transfer/core/domain';
// import { ProcessTransferService } from 'src/modules/transfer/core/services/processTransfer.service';
// import { TransferDto } from 'src/modules/transfer/interfaces/dto';
// import { TransferRequestStatus } from 'src/shared/enums';

@Injectable()
export class PendingQueueService {
  private readonly logger = new Logger(PendingQueueService.name);

  // constructor(
  //   private readonly transferRepository: TransferRepositoryPort,
  //   private readonly processTransferService: ProcessTransferService,
  // ) {}

  async processPending(): Promise<void> {
    // TODO: implement this method
  }
}
