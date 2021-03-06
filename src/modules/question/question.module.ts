import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from 'src/modules/question/infrastructure/api/question.controller';
import { FileModule } from '../file/file.module';
import { ResponseModule } from '../response/response.module';
import { QuestionAdoptService } from './application/service/question-adopt.service';
import { QuestionCheckIssuerService } from './application/service/question-check-issuer.service';
import { QuestionCreateService } from './application/service/question-create.service';
import { QuestionDeleteService } from './application/service/question-delete.service';
import { QuestionDetailViewService } from './application/service/question-detail-view.service';
import { QuestionHistoryService } from './application/service/question-history.service';
import { QuestionSearchService } from './application/service/question-search.service';
import { QuestionUpdateService } from './application/service/question-update.service';
import { QuestionUtilService } from './application/service/question-util-service';
import { QuestionViewService } from './application/service/question-view.service';
import { QUESTION_PORT } from './domain/port/question.port';
import { QuestionAdapter } from './infrastructure/persistence/question.adapter';
import { QuestionQueryRepository } from './infrastructure/persistence/repository/question-query.repository';
import { QuestionRepository } from './infrastructure/persistence/repository/question.repository';
import { QuestionRelegationService } from './application/service/question-relegation.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionRepository]),
    TypeOrmModule.forFeature([QuestionQueryRepository]),
    ResponseModule,
    FileModule,
  ],
  controllers: [QuestionController],
  providers: [
    QuestionCreateService,
    QuestionUpdateService,
    QuestionDeleteService,
    QuestionViewService,
    QuestionDetailViewService,
    QuestionSearchService,
    QuestionCheckIssuerService,
    QuestionAdoptService,
    QuestionUtilService,
    QuestionHistoryService,
    QuestionRelegationService,
    {
      provide: QUESTION_PORT,
      useClass: QuestionAdapter,
    },
  ],
  exports: [
    QuestionCheckIssuerService,
    QuestionAdoptService,
    QuestionRelegationService,
  ],
})
export class QuestionModule {}
