import { NestFactory } from '@nestjs/core';
import { RootModule} from './root.module';
import { LoggingInterceptor } from './interceptor/logger.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap(); 
