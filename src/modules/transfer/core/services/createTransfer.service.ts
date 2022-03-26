import { HttpException, Injectable, Logger } from '@nestjs/common';
import { TransferRepositoryPort } from 'src/infrastructure/ports';
import { Transfer } from 'src/modules/transfer/core/domain';
import { TransferDto } from 'src/modules/transfer/interfaces/dto';
import {
  expectedDateCreationError,
  rejectedTransfer,
} from 'src/modules/transfer/interfaces/responses';
import { TransferRequestStatus } from 'src/shared/enums';

@Injectable()
export class CreateTransferService {
  private readonly logger = new Logger(CreateTransferService.name);

  constructor(private readonly transferRepository: TransferRepositoryPort) {}

  async create(transferDto: TransferDto): Promise<TransferRequestStatus> {
    this.logger.verbose(`Creating transfer ${JSON.stringify(transferDto)}`);

    const transfer = await this.transferRepository.save(
      new Transfer(transferDto),
    );

    if (transfer.expectedOn && transfer.expectedOn < new Date()) {
      throw new HttpException(
        expectedDateCreationError.description,
        expectedDateCreationError.status,
      );
    }

    // TODO: call bank api

    // TODO: add treatment to error and send it to queue
    if (false) {
      throw new HttpException(
        rejectedTransfer.description,
        rejectedTransfer.status,
      );
    }

    return TransferRequestStatus.COMPLETED;
  }
}
