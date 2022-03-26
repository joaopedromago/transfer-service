import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  BankSettlementResponseDto,
  TransferDto,
} from 'src/modules/transfer/interfaces/dto';
import { TransferStatus } from 'src/shared/enums';
import { SchemaFactoryWithMethods } from 'src/shared/utils';

export const transferCollectionName = 'transfer';

@Schema({ collection: transferCollectionName })
export class Transfer {
  @Prop()
  internalId?: string;

  @Prop()
  externalId: string;

  @Prop()
  amount: number; // cents

  @Prop()
  status?: TransferStatus;

  @Prop()
  expectedOn?: Date;

  constructor(transferDto?: TransferDto) {
    if (transferDto) {
      this.externalId = transferDto.externalId;
      this.amount = transferDto.amount;
      this.expectedOn = transferDto.expectedOn;
    }
  }

  setBankSettlementInformation(bankSettlementInfo: BankSettlementResponseDto) {
    this.internalId = bankSettlementInfo.internalId;
    this.status = bankSettlementInfo.status;
  }
}

export type TransferDocument = Transfer & Document;

export const TransferSchema = SchemaFactoryWithMethods.createForClass(Transfer);
