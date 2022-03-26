import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'src/infrastructure/config';
import { TransferModule } from 'src/modules/transfer/transfer.module';

@Module({
  imports: [MongooseModule.forRoot(env.MONGO_URL), TransferModule],
})
export class AppModule {}
