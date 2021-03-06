import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { QuestionState } from '../../domain/entity/question-state.enum';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';

@Injectable()
export class QuestionRelegationService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async relegation(postIdentifier: number): Promise<number | undefined> {
    const identifier: number = await this.questionPort.updateQuestionState(
      postIdentifier,
      QuestionState.NONE,
    );
    if (!identifier) {
      throw new UnexpectedErrorException();
    }

    return identifier;
  }
}
