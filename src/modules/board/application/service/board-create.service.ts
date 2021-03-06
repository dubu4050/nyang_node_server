import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { BoardPort, BOARD_PORT } from '../../domain/port/board.port';
import { BoardType } from '../../domain/type/board.type';
import { BoardCreateReqDto } from '../dto/board-create.dto';
import { Transactional } from 'typeorm-transactional-cls-hooked';
@Injectable()
export class BoardCreateService {
  constructor(@Inject(BOARD_PORT) private readonly boardPort: BoardPort) {}

  @Transactional()
  async create(
    memberIdentifier: number,
    boardCreateReqDto: BoardCreateReqDto,
    category: BoardType,
  ): Promise<number | undefined> {
    const identifier: number = await this.boardPort.createBoard(
      memberIdentifier,
      boardCreateReqDto,
      category,
    );
    if (!identifier) {
      throw new UnexpectedErrorException();
    }

    return identifier;
  }
}
