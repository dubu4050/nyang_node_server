import { Inject, Injectable } from '@nestjs/common';
import { QuestionPort, QUESTION_PORT } from '../../domain/port/question.port';
import { QuestionHistoryResDto } from '../dto/question-history.dto';

@Injectable()
export class QuestionHistoryService {
  constructor(
    @Inject(QUESTION_PORT) private readonly questionPort: QuestionPort,
  ) {}

  async history(
    memberIdentifier: number,
    perPage: number,
    skippedItems: number,
  ): Promise<QuestionHistoryResDto[] | undefined> {
    const questions: QuestionHistoryResDto[] = await this.questionPort.findPaginatedQuestionByMemberIdentifier(
      memberIdentifier,
      skippedItems,
      perPage,
    );
    return questions;
  }
}
