import { Repository, EntityRepository } from 'typeorm';
import { Question } from 'src/modules/question/domain/entity/question.entity';
import { QuestionDetailViewResDto } from '../../../application/dto/question-detail.dto';
import { classToPlain, plainToClass } from 'class-transformer';
import { QuestionIssuer } from '../../../domain/type/question-issuer.type';
import { QuestionViewResDto } from '../../../application/dto/question-view.dto';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import { LEN_OF_SUMMARY } from 'src/modules/question/domain/constant/content.constant';
import { QuestionHistoryResDto } from 'src/modules/question/application/dto/question-history.dto';

@EntityRepository(Question)
export class QuestionQueryRepository extends Repository<Question> {

  async findQuestionIssuerByIdentifier(identifier:number):Promise<number|undefined>{
    const data = await this.createQueryBuilder('q').select('m.identifier','identifier')
    .innerJoin('member','m','m.identifier = q.member_identifier')
    .where('q.identifier = :identifier',{identifier})
    .andWhere('q.commonIs_deleted = :none', { none: 'none' })
    .getRawOne()

    const issuer :number = data.identifier;
    return issuer;
  }

  async findQuestionDetailByIdentifier(
    memberIdentifier: number,
    memberIsAdmin: boolean,
    identifier: number,
  ): Promise<QuestionDetailViewResDto | undefined> {
    try {
      const data = await this.createQueryBuilder('q')
        .select('q.title', 'title')
        .addSelect('q.content', 'content')
        .addSelect('q.genus', 'genus')
        .addSelect('q.species', 'species')
        .addSelect('q.age', 'age')
        .addSelect('m.nickname', 'nickname')
        .addSelect('q.commonCreate_date', 'createDate')
        .addSelect('m.identifier', 'memberIdentifier')
        .addSelect('m.member_photo')
        .where('q.identifier = :identifier', { identifier })
        .addSelect('f.path', 'profile_photo_path')
        .innerJoin('q.member_identifier', 'm', 'm.isDeleted = :isDeleted', {
          isDeleted: RecordState.NONE,
        })
        .leftJoin('file', 'f', 'm.member_photo = f.identifier')
        .getRawOne();

      console.log(data);
      const questionDetailViewResDto = plainToClass(
        QuestionDetailViewResDto,
        classToPlain(data),
      );
      if (
        data &&
        (data.memberIdentifier === memberIdentifier || memberIsAdmin)
      ) {
        questionDetailViewResDto.isIssuer = QuestionIssuer.ISSUER;
      }
      return questionDetailViewResDto;
    } catch (error) {
      console.log(error);
    }
  }

  async findPaginatedQuestion(
    skippedItems: number,
    perPage: number,
  ): Promise<QuestionViewResDto[] | undefined> {
    const datas = await this.createQueryBuilder('q')
      .select('q.identifier', 'identifier')
      .addSelect('q.title', 'title')
      .addSelect('q.content', 'content')
      .addSelect('q.genus', 'genus')
      .addSelect('m.nickname', 'nickname')
      .addSelect('q.state', 'state')
      .addSelect('count(a.identifier)', 'answerNum')
      .addSelect('q.create_date', 'create_date')
      .addSelect('f.path', 'profile_photo_path')
      .innerJoin('member', 'm', 'q.memberIdentifierIdentifier = m.identifier')
      .leftJoin('answer', 'a', 'a.questionIdentifierIdentifier = q.identifier')
      .leftJoin('file', 'f', 'm.member_photo = f.identifier')
      .where('q.commonIs_deleted = :none', { none: 'none' })
      .groupBy('q.identifier')
      .orderBy('create_date', 'DESC')
      .offset(skippedItems)
      .limit(perPage)
      .getRawMany();

    return datas.map((data) => {
      const { content, ...dataExceptContent } = data;
      const summary = content.replace(/<[^>]+>/g, '').slice(0, LEN_OF_SUMMARY);
      const question: QuestionViewResDto = plainToClass(
        QuestionViewResDto,
        classToPlain({ ...dataExceptContent, summary }),
      );
      return question;
    });
  }

  async findPaginatedQuestionByKeyword(
    skippedItems: number,
    perPage: number,
    keyword: string,
  ): Promise<QuestionViewResDto[] | undefined> {
    const datas = await this.createQueryBuilder('q')
      .select('q.identifier', 'identifier')
      .addSelect('q.title', 'title')
      .addSelect('q.content', 'content')
      .addSelect('q.genus', 'genus')
      .addSelect('m.nickname', 'nickname')
      .addSelect('q.state', 'state')
      .addSelect('count(a.identifier)', 'answerNum')
      .addSelect('q.create_date', 'create_date')
      .addSelect('f.path', 'profile_photo_path')
      .innerJoin('member', 'm', 'q.memberIdentifierIdentifier = m.identifier')
      .leftJoin('answer', 'a', 'a.questionIdentifierIdentifier = q.identifier')
      .leftJoin('file', 'f', 'm.member_photo = f.identifier')
      .where('q.commonIs_deleted = :none', { none: 'none' })
      .andWhere('q.title like :keyword', {
        keyword: `%${keyword}%`,
      })
      .groupBy('q.identifier')
      .orderBy('create_date', 'DESC')
      .offset(skippedItems)
      .limit(perPage)
      .getRawMany();

    return datas.map((data) => {
      const { content, ...dataExceptContent } = data;
      const summary = content.replace(/<[^>]+>/g, '').slice(0, LEN_OF_SUMMARY);
      const question: QuestionViewResDto = plainToClass(
        QuestionViewResDto,
        classToPlain({ ...dataExceptContent, summary }),
      );
      return question;
    });
  }

  async findPaginatedQuestionByMemberIdentifier(
    memberIdentifier: number,
    skippedItems: number,
    perPage: number,
  ): Promise<QuestionHistoryResDto[] | undefined> {
    const datas = await this.createQueryBuilder('q')
      .select('q.identifier', 'identifier')
      .addSelect('q.title', 'title')
      .addSelect('q.create_date', 'created_date')
      .addSelect('count(a.identifier)', 'answer_number')
      .addSelect('q.state', 'state')
      .leftJoin('answer', 'a', 'a.question_identifier = q.identifier')
      .where('q.member_identifier = :memberIdentifier', { memberIdentifier })
      .andWhere('q.commonIs_deleted = :none', { none: 'none' })
      .groupBy('q.identifier')
      .orderBy('q.create_date', 'DESC')
      .offset(skippedItems)
      .limit(perPage)
      .getRawMany();

    console.log(datas);
    return datas.map((data) => {
      return plainToClass(QuestionHistoryResDto, classToPlain(data));
    });
  }
}
