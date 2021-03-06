import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import { QuestionCreateReqDto } from '../dto/question-enroll.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class QuestionCreateService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  @Transactional()
  async create(
    memberIdentifier: number,
    questionCreateReqDto: QuestionCreateReqDto,
  ): Promise<number | undefined> {
    const questionIdentifier = await this.questionPort.createQuestion(
      memberIdentifier,
      questionCreateReqDto,
    );
    if (!questionIdentifier) {
      throw new UnexpectedErrorException();
    }

    return questionIdentifier;
  }
}
