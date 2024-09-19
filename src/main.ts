import { NestFactory } from '@nestjs/core';
import { RootModule} from './root.module';
import { LoggingInterceptor } from './interceptor/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
