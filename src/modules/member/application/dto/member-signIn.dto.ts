import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// Request
export class MemberCreateReqDto {
  @ApiProperty()
  @IsString()
  readonly account: string;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly nickname: string;

  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly phone_number: string;

  @ApiProperty()
  @IsString()
  readonly date_birth: Date;
}

// Response state
