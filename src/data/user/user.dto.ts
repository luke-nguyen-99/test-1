import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger/dist';

export class CreateUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  phone: string;
  @ApiPropertyOptional()
  address: string;
  @ApiPropertyOptional()
  point: string;
}
export class UserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  phone: string;
  @ApiPropertyOptional()
  address: string;
  @ApiPropertyOptional()
  point: string;
}

export class SetPointDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  point: string;
}
