import { Injectable } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { RecordState } from 'src/modules/post/domain/entity/record-state.enum';
import {
  MemberFindAccountReqDto,
  MemberFindAccountResDto,
} from '../../application/dto/member-find-account.dto';
import { MemberReadResDto } from '../../application/dto/member-read.dto';
import { MemberCreateReqDto } from '../../application/dto/member-signIn.dto';
import { MemberUpdateReqDto } from '../../application/dto/member-update.dto';
import { Member } from '../../domain/entity/member.entity';
import { MemberPort } from '../../domain/port/member.port';
import { MemberQueryRepository } from './repository/member-query-repository';
import { MemberRepository } from './repository/member.repository';

@Injectable()
export class MemberAdapter implements MemberPort {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly memberQueryRepository: MemberQueryRepository,
  ) {}

  async findMemberByIdentifier(
    identifier: number,
  ): Promise<MemberReadResDto | undefined> {
    const member: MemberReadResDto = await this.memberQueryRepository.findMemberByIdentifier(
      identifier,
    );
    return member;
  }
  async countMemberByAccount(account: string): Promise<number | undefined> {
    const count = await this.memberRepository.count({ account });
    return count;
  }
  async findMemberByAccount(account: string): Promise<Member | undefined> {
    const member: Member = await this.memberRepository.findOne({ account });
    return member;
  }
  async createMember(
    memberCreateReqDto: MemberCreateReqDto,
    encryptedPassword: string,
  ): Promise<Member | undefined> {
    const member: Member = await this.memberRepository.create({
      ...memberCreateReqDto,
      password: encryptedPassword,
    });
    await this.memberRepository.save(member);
    return member;
  }
  async deleteMember(
    identifier: number,
    alternate: string,
    isDeleted: RecordState,
  ): Promise<number | undefined> {
    await this.memberRepository.update(
      { identifier },
      { account: alternate, isDeleted },
    );
    return identifier;
  }
  async findAccount(
    memberFindAccountReqDto: MemberFindAccountReqDto,
  ): Promise<MemberFindAccountResDto | undefined> {
    const member: Member = await this.memberRepository.findOne({
      ...memberFindAccountReqDto,
    });
    return plainToClass(MemberFindAccountResDto, classToPlain(member));
  }
  async saveMember(member: Member): Promise<number | undefined> {
    await this.memberRepository.save(member);
    return member.identifier;
  }
  async updateMember(
    identifier: number,
    memberUpdateReqDtoo: MemberUpdateReqDto,
    fileIdentifier: number,
  ): Promise<number | undefined> {
    await this.memberRepository.update(
      { identifier },
      { ...memberUpdateReqDtoo, member_photo: { identifier: fileIdentifier } },
    );
    return identifier;
  }

  async findRoleByIdentifier(identifier: number): Promise<string | undefined> {
    return await this.memberQueryRepository.findRoleByIdentifier(identifier);
  }
}
