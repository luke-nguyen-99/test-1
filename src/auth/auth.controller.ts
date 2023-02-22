import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { isPublic } from 'src/shared/isPublic.decorator';
import { RegisterDto, SignInDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @isPublic()
  @Post('sign-in')
  @ApiConsumes('application/x-www-form-urlencoded')
  async signIn(@Body() input: SignInDto) {
    try {
      return this.service.validateUser(input.email, input.password);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('info')
  @ApiBearerAuth()
  async getInfo(@Req() req) {
    return req.user;
  }

  @Post('sign-up')
  @ApiConsumes('application/x-www-form-urlencoded')
  @isPublic()
  async signUp(@Body() input: RegisterDto) {
    try {
      return this.service.register(input);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
