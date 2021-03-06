import { QuestionDetailViewResDto } from '../../application/dto/question-detail.dto';
import { QuestionCreateReqDto } from '../../application/dto/question-enroll.dto';
import { QuestionHistoryResDto } from '../../application/dto/question-history.dto';
import { QuestionUpdateReqDto } from '../../application/dto/question-update.dto';
import { QuestionViewResDto } from '../../application/dto/question-view.dto';
import { QuestionState } from '../entity/question-state.enum';

export const QUESTION_PORT = 'QUESTION_PORT';

export interface QuestionPort {
  createQuestion(
    memberIdentifier: number,
    questionCreateReqDto: QuestionCreateReqDto,
  ): Promise<number | undefined>;

  updateQuestion(
    identifier: number,
    questionUpdateReqDto: QuestionUpdateReqDto,
  ): Promise<number | undefined>;

  deleteQuestionByIdentifier(identifier: number): Promise<number | undefined>;

  findQuestionIssuerByIdentifier(identifier:number):Promise<number|undefined>;

  findQuestionDetailByIdentifierAndMember(
    memberIdentifier: number,
    memberIsAdmin: boolean,
    identifier: number,
  ): Promise<QuestionDetailViewResDto | undefined>;

  findPaginatedQuestionByKeyword(
    skippedItems: number,
    perPage: number,
    keyword: string,
  ): Promise<QuestionViewResDto[] | undefined>;

  findPaginatedQuestion(
    skippedItems: number,
    perPage: number,
  ): Promise<QuestionViewResDto[] | undefined>;

  findPaginatedQuestionByMemberIdentifier(
    memberIdentifier: number,
    skippedItems: number,
    perPage: number,
  ): Promise<QuestionHistoryResDto[] | undefined>;

  countQuestion(): Promise<number | undefined>;

  countQuestionByMemberIdentifier(
    memberIdentifier: number,
  ): Promise<number | undefined>;

  updateQuestionState(
    postIdentifier: number,
    questionState: QuestionState,
  ): Promise<number | undefined>;
}
