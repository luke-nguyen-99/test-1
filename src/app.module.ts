import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './data/user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthorGuard } from './shared/auth.guard';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    SharedModule,
    // DatabaseModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthorGuard,
    },
  ],
})
export class AppModule {}
