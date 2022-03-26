import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'src/infrastructure/config';

@Module({
  imports: [MongooseModule.forRoot(env.MONGO_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
