import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  BankSettlementPort,
  TransferRepositoryPort,
} from 'src/infrastructure/ports';
import { TransferDocument } from 'src/modules/transfer/core/domain';
import { BankSettlementRequestDto } from 'src/modules/transfer/interfaces/dto';
import {
  expectedDateCreationError,
  rejectedTransfer,
} from 'src/modules/transfer/interfaces/responses';
import { TransferRequestStatus, TransferStatus } from 'src/shared/enums';
import { to } from 'src/shared/utils';

@Injectable()
export class ProcessTransferService {
  private readonly logger = new Logger(ProcessTransferService.name);

  constructor(
    private readonly transferRepository: TransferRepositoryPort,
    private bankSettlementService: BankSettlementPort,
  ) {}

  validateExpectedDateLimit(expectedDate?: Date) {
    if (expectedDate && expectedDate < new Date()) {
      throw new HttpException(
        expectedDateCreationError.description,
        expectedDateCreationError.status,
      );
    }
  }

  async process(transfer: TransferDocument): Promise<TransferRequestStatus> {
    this.logger.verbose(`Processing transfer ${JSON.stringify(transfer)}`);

    this.validateExpectedDateLimit(transfer.expectedOn);

    const bankSettlementPayload = new BankSettlementRequestDto(transfer);

    const [error, response] = await to(
      this.bankSettlementService.post(bankSettlementPayload),
    );

    if (error) {
      // TODO: send to queue
      return TransferRequestStatus.PROCESSING;
    }

    transfer.setBankSettlementInformation(response.data);
    await this.transferRepository.update(transfer);

    if (response.data.status === TransferStatus.REJECTED) {
      throw new HttpException(
        rejectedTransfer.description,
        rejectedTransfer.status,
      );
    }

    return TransferRequestStatus.COMPLETED;
  }
}
