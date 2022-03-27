import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  BankSettlementPort,
  TransferRepositoryPort,
} from 'src/infrastructure/ports';
import { SaveToQueueService } from 'src/modules/pendingQueue/core/services/saveToQueue.service';
import { Transfer, TransferDocument } from 'src/modules/transfer/core/domain';
import { BankSettlementRequestDto } from 'src/modules/transfer/interfaces/dto';
import {
  expectedDateCreationError,
  rejectedTransfer,
} from 'src/modules/transfer/interfaces/responses';
import { TransferStatus } from 'src/shared/enums';
import { to } from 'src/shared/utils';

@Injectable()
export class ProcessTransferService {
  private readonly logger = new Logger(ProcessTransferService.name);

  constructor(
    private readonly transferRepository: TransferRepositoryPort,
    private bankSettlementService: BankSettlementPort,
    private saveToQueueService: SaveToQueueService,
  ) {}

  validateExpectedDateLimit(expectedDate?: Date) {
    if (expectedDate && expectedDate < new Date(Date.now())) {
      throw new HttpException(
        expectedDateCreationError.description,
        expectedDateCreationError.status,
      );
    }
    this.logger.verbose('Transfer expeced date passes the limit test');
  }

  async process(transfer: TransferDocument): Promise<Transfer | undefined> {
    this.logger.verbose(`Processing transfer ${JSON.stringify(transfer)}`);

    this.validateExpectedDateLimit(transfer.expectedOn);

    const bankSettlementPayload = new BankSettlementRequestDto(transfer);

    this.logger.verbose(`Sending request to bank settlement with ${transfer}`);

    const [error, response] = await to(
      this.bankSettlementService.post(bankSettlementPayload),
    );

    if (error) {
      await this.saveToQueueService.save(transfer._id);
      this.logger.error(
        `Error while sending to bank settlement ${error.message}`,
      );
      return;
    }

    this.logger.verbose(
      `Bank settlement response ${JSON.stringify(response.data)}`,
    );
    transfer.setBankSettlementInformation(response.data);
    await this.transferRepository.update(transfer);

    if (response.data.status === TransferStatus.REJECTED) {
      throw new HttpException(
        rejectedTransfer.description,
        rejectedTransfer.status,
      );
    }

    return transfer;
  }
}
