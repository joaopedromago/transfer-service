import { Transfer } from 'src/modules/transfer/core/domain';
import { TransferStatus } from 'src/shared/enums';

export class BankSettlementRequestDto {
  constructor(transfer: Transfer) {
    this.externalId = transfer.externalId;
    this.amount = transfer.amount;
    this.expectedOn = transfer.expectedOn;
  }

  externalId: string;
  amount: number;
  expectedOn?: Date;
}

export class BankSettlementResponseDto {
  internalId: string;
  status: TransferStatus;
}
