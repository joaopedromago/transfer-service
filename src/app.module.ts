import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { env } from 'src/infrastructure/config';
import { PendingQueueModule } from 'src/modules/pendingQueue/pendingQueue.module';
import { TransferModule } from 'src/modules/transfer/transfer.module';

@Module({
  imports: [
    MongooseModule.forRoot(env.MONGO_URL),
    ScheduleModule.forRoot(),
    TransferModule,
    PendingQueueModule,
  ],
})
export class AppModule {}
