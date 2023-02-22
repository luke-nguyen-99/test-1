import { Controller } from '@nestjs/common';
import { Body, Get, Param, Post, Put } from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common/exceptions';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger/dist';
import { Roles } from 'src/shared/role.decorator';
import { CreateUserDto, SetPointDto, UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async getAll() {
    try {
      return this.service.getAll();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Get('/:id')
  async getOne(@Param('id') id: string) {
    try {
      return this.service.getOne(id);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('create')
  @Roles('admin')
  @ApiConsumes('application/x-www-form-urlencoded')
  async create(@Body() input: CreateUserDto) {
    try {
      return this.service.create(input);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Put('update/:id')
  @Roles('admin')
  @ApiConsumes('application/x-www-form-urlencoded')
  async update(@Param('id') id: string, @Body() input: UserDto) {
    try {
      return this.service.update(id, input);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Put('set-point')
  @Roles('admin')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          point: { type: 'string' },
        },
      },
    },
  })
  async setPoint(@Body() input: SetPointDto[]) {
    try {
      return this.service.setPoint(input);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
