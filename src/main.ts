import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from 'src/infrastructure/plugin';
import { Logger } from '@nestjs/common';
import { env } from 'src/infrastructure/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  swagger.init(app);

  const appPort = env.PORT || 3000;

  await app.listen(appPort);
  logger.log(`Application listening on port ${appPort}`);
}
bootstrap();
