import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { UserController } from './users/users.controller';
import { UserService } from './users/users.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';


@Module({
  imports: [UserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class RootModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
