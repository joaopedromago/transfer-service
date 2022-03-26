import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TransferDto } from 'src/modules/transfer/interfaces/dto';
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
  status: TransferStatus;

  @Prop()
  amount: number; // cents

  @Prop()
  expectedOn?: Date;

  constructor(transferDto?: TransferDto) {
    if (transferDto) {
      this.externalId = transferDto.externalId;
      this.amount = transferDto.amount;
      this.expectedOn = transferDto.expectedOn;
    }
  }
}

export type TransferDocument = Transfer & Document;

export const TransferSchema = SchemaFactoryWithMethods.createForClass(Transfer);
