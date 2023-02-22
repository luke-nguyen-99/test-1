import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SignInDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}

export class RegisterDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiPropertyOptional()
    name: string;
    @ApiPropertyOptional()
    phone: string;
    @ApiPropertyOptional()
    address: string;
}