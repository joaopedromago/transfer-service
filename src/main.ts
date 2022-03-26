import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from 'src/infrastructure/plugin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swagger.init(app);

  await app.listen(3000);
}
bootstrap();
