import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from 'src/data/user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'ok',
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS512',
      },
    }),
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
