import { Inject, Injectable } from '@nestjs/common';
import { UnexpectedErrorException } from 'src/modules/common/exception/unexpected-error-exception';
import { NotExistException } from 'src/modules/member/application/exception/not-exist.exception';
import { ROLE_MEMBER_MAPPING_PORT } from 'src/modules/role/domain/port/port.constant';
import { RoleMemberMappingPort } from 'src/modules/role/domain/port/role-member-mapping.port';
import { RoleMemberMappingFindResDto } from '../../dto/role-member-mapping-find.dto';

@Injectable()
export class RoleMemberMappingSearchService {
  constructor(
    @Inject(ROLE_MEMBER_MAPPING_PORT)
    private readonly roleMemberMappingPort: RoleMemberMappingPort,
  ) {}

  async search(
    skippedItems: number,
    perPage: number,
    keyword: string,
  ): Promise<RoleMemberMappingFindResDto[] | undefined> {
    const roleMemberMappings: RoleMemberMappingFindResDto[] = await this.roleMemberMappingPort.findPaginatedRoleMemberMappingByKeyword(
      skippedItems,
      perPage,
      keyword,
    );
    if (!roleMemberMappings) {
      throw new NotExistException();
    }
    return roleMemberMappings;
  }
}
