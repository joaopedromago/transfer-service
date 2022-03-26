import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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

  constructor() {
    // TODO: add dto
  }
}

export type TransferDocument = Transfer & Document;

export const TransferSchema = SchemaFactoryWithMethods.createForClass(Transfer);
