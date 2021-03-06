import { AnswerCreateReqDto } from '../../application/dto/answer-create.dto';
import { AnswerFindResDto } from '../../application/dto/answer-find.dto';
import { AnswerHistoryResDto } from '../../application/dto/answer-history.dto';
import { Answer } from '../entity/answer.entity';

export const ANSWER_PORT = 'ANSWER_PORT';

export interface AnswerPort {
  createAnswer(
    memberIdentifier: number,
    answerCreateReqDto: AnswerCreateReqDto,
  ): Promise<number | undefined>;
  deleteAnswerByIdentifier(identifer: number): Promise<number | undefined>;
  findAnswerByIdentifier(identifier: number): Promise<Answer | undefined>;
  findAnswersByPostIdentifier(
    postIdentifier: number,
    memberIdentifier: number,
  ): Promise<AnswerFindResDto[] | undefined>;
  findPaginatedAnswerByMemberIdentifier(
    memberIdentifier: number,
    skippedItems: number,
    perPage: number,
  ): Promise<AnswerHistoryResDto[] | undefined>;
  saveAnswer(asnwer: Answer): Promise<number | undefined>;
  countBoardByMemberIdentifier(
    memberIdentifier: number,
  ): Promise<number | undefined>;
}
