import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

//request
export class AnswerCreateReqDto {
  @ApiProperty()
  @IsNumber()
  postIdentifier: number;

  @ApiProperty()
  @IsString()
  content: string;
}
