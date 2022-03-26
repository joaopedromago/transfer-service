import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaFactoryWithMethods } from 'src/shared/utils';

export const transferCollectionName = 'transfer';

@Schema({ collection: transferCollectionName })
export class Queue {
  @Prop()
  transferId: string;

  @Prop()
  isPending: boolean;

  constructor(transferId?: string) {
    if (transferId) {
      this.transferId = transferId;
    }
    this.isPending = true;
  }
}

export type QueueDocument = Queue & Document;

export const QueueSchema = SchemaFactoryWithMethods.createForClass(Queue);
