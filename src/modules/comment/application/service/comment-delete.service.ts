import { Inject, Injectable } from '@nestjs/common';
import { NotExistException } from 'src/modules/answer/application/exception/not-exist.exception';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { Member } from 'src/modules/member/domain/entity/member.entity';
import { Comment } from '../../domain/entity/comment.entity';
import { CommentPort, COMMENT_PORT } from '../../domain/port/comment.port';
import { NotAIssuerException } from '../exception/not-a-issuer.exception';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class CommentDeleteService {
  constructor(
    @Inject(COMMENT_PORT) private readonly commentPort: CommentPort,
  ) {}

  @Transactional()
  async delete(
    identifier: number,
    memberIdentifier: number,
  ): Promise<number | undefined> {
    const comment: Comment = await this.commentPort.findCommentByIdentifier(
      identifier,
    );
    if (!comment) {
      throw new NotExistException();
    }

    const member: Member = await comment.member;
    if (member.identifier !== memberIdentifier) {
      throw new NotAIssuerException();
    }

    const commentIdentifier: number = await this.commentPort.deleteCommentByIdentifier(
      identifier,
    );
    if (!commentIdentifier) {
      throw new UnexpectedErrorException();
    }

    return commentIdentifier;
  }
}
