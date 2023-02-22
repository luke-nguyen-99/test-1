import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/data/user/user.schema';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user')
    private model: Model<User & Document>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.model
      .findOne({ email })
      .select([
        'email',
        'password',
        'role',
        'name',
        'phone',
        'address',
        'point',
      ])
      .lean();
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return this.jwtService.sign(result);
    }
    throw new BadRequestException('Login fail');
  }

  async register(input: RegisterDto) {
    const user = await this.model.create({
      ...input,
      role: 'user',
    });
    const { password, ...result } = user.toObject();

    return this.jwtService.sign(result);
  }
}
